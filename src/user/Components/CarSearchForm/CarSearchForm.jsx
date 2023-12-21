import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faCarOn,
  faTruck,
  faVanShuttle,
  faLocationDot,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { tipeOptions } from "../../../admin/components/modals/MobilFormOptions";
import {
  Row,
  Col,
  Form,
  Card,
  Placeholder,
  Button,
  Container,
} from "react-bootstrap";
import { GetAllMobil } from "../../../api/apiMobil";
import { GetAllCabang } from "../../../api/apiCabang";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
function CarSearchForm() {
  const navigate = useNavigate();
  const [showDropOffLocation, setShowDropOffLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cabang, setCabang] = useState([]);
  const [mobil, setMobil] = useState([]);
  const [filteredMobil, setfilteredMobil] = useState([]);
  const [dates, setDates] = useState({
    waktu_pickup: new Date().toISOString().split("T")[0],
    waktu_dropoff: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  });
  const handleDate = (e) => {
    const { name, value } = e.target;
    setDates({
      ...dates,
      [name]: value,
    });
  };
  const [transaksi, setTransaksi] = useState({
    id_mobil: "",
    id_cabang_pickup: "",
    id_cabang_dropoff: "",
    waktu_pickup: "",
    waktu_dropoff: "",
    metode_pembayaran: "",
    details: "",
    total: "",
    tipe: "",
  });
  const handleChange = (event) => {
    setTransaksi({ ...transaksi, [event.target.name]: event.target.value });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const mobilResponse = await GetAllMobil();
      const hanyaMobilTersedia = mobilResponse.filter((item) => !item.disewa);
      const cabangResponse = await GetAllCabang();

      setCabang(cabangResponse);
      setMobil(hanyaMobilTersedia);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [selectedTipe, setSelectedTipe] = useState("semua");
  const handleSelectTipe = (event) => {
    setSelectedTipe(event.target.value);
    setfilteredMobil(mobil.filter((item) => item.tipe === selectedTipe));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!showDropOffLocation) {
      transaksi.id_cabang_dropoff = transaksi.id_cabang_pickup;
    }
    transaksi.waktu_pickup = dates.waktu_pickup;
    transaksi.waktu_dropoff = dates.waktu_dropoff;
    transaksi.tipe = selectedTipe;
    if (
      transaksi.id_cabang_dropoff === null ||
      transaksi.id_cabang_pickup === null ||
      transaksi.id_cabang_dropoff === "" ||
      transaksi.id_cabang_pickup === ""
    ) {
      toast.dark("Pilih lokasi pickup dropoff");
      return;
    }

    if (
      transaksi.waktu_pickup === null ||
      transaksi.waktu_pickup === "" ||
      transaksi.waktu_dropoff === null ||
      transaksi.waktu_dropoff === ""
    ) {
      toast.dark("Pilih waktu pickup dropoff");
      return;
    }
    const queryParams = new URLSearchParams();
    queryParams.append("data", JSON.stringify(transaksi));

    navigate(`/home/search?${queryParams.toString()}`);
  };

  const handleCheckboxChange = () => {
    setShowDropOffLocation(!showDropOffLocation);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <div className="m-auto align-items-center justify-content-center">
          <Card className="p-3">
            <Card.Body>
              <Row className="mb-3">
                <Col md="auto">
                  <h3 className="row-cols">Kendaraan tipe apa yang dicari ?</h3>
                </Col>
                <Col>
                  {isLoading ? (
                    <Placeholder.Button variant="secondary" xs={12} />
                  ) : (
                    <Form.Select
                      value={selectedTipe}
                      onChange={handleSelectTipe}
                    >
                      {tipeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </Col>
              </Row>
              <Row>
                <Col className="col-sm-8 flex-grow-1">
                  <div className="d-flex justify-content-sm-between">
                    <label
                      className="form-check-label me-auto"
                      htmlFor="pick_up_location"
                    >
                      <FontAwesomeIcon icon={faLocationDot} /> Lokasi
                      Pengambilan & Pengembalian
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="true"
                        id="sameLocationCheckBox"
                        checked={!showDropOffLocation}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="sameLocationCheckBox"
                      >
                        Tempat Pengembalian yang sama
                      </label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="pick-up-location flex-grow-1">
                      {isLoading ? (
                        <Placeholder.Button variant="secondary" xs={12} />
                      ) : cabang.length > 0 ? (
                        <Form.Select
                          onChange={handleChange}
                          value={transaksi?.id_cabang_pickup}
                          name="id_cabang_pickup"
                          id="id_cabang_pickup"
                        >
                          <option hidden>Pilih Lokasi</option>
                          {cabang.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.kota}
                            </option>
                          ))}
                        </Form.Select>
                      ) : (
                        <Button variant="secondary" className="w-100" disabled>
                          Mohon Maaf Cabang Belum Ada
                        </Button>
                      )}
                    </div>
                    <div
                      className="drop-off-location flex-grow-1 ms-2"
                      style={{
                        display: showDropOffLocation ? "block" : "none",
                      }}
                      id="dropOffLocationTextField"
                    >
                      {isLoading ? (
                        <Placeholder.Button variant="secondary" xs={12} />
                      ) : cabang.length > 0 ? (
                        <Form.Select
                          onChange={handleChange}
                          name="id_cabang_dropoff"
                          id="id_cabang_dropoff"
                          value={transaksi?.id_cabang_dropoff}
                        >
                          <option hidden>Pilih Lokasi</option>
                          {cabang.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.kota}
                            </option>
                          ))}
                        </Form.Select>
                      ) : (
                        <Button variant="secondary" className="w-100" disabled>
                          Mohon Maaf Cabang Belum Ada
                        </Button>
                      )}
                    </div>
                  </div>
                </Col>
                <div className="col-sm-auto flex-grow-1">
                  <div className="row">
                    <label className="form-check-label" htmlFor="pick_up_date">
                      <FontAwesomeIcon icon={faCalendarDays} /> Waktu
                      Pengambilan & Pengembalian
                    </label>
                  </div>
                  <Row className="row flex-grow-1">
                    <Col className="col-md-6">
                      <Form.Control
                        type="date"
                        id="waktu_pickup"
                        name="waktu_pickup"
                        onChange={handleDate}
                        min={new Date().toISOString().split("T")[0]}
                        defaultValue={dates.waktu_pickup}
                      />
                    </Col>
                    <Col className="col-md-6">
                      <Form.Control
                        type="date"
                        id="waktu_dropoff"
                        name="waktu_dropoff"
                        onChange={handleDate}
                        defaultValue={dates.waktu_dropoff}
                        min={
                          new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                            .toISOString()
                            .split("T")[0]
                        }
                      />
                    </Col>
                  </Row>
                </div>
              </Row>
              <Button variant="success" type="submit" className="mt-3 w-100">
                Search
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Form>
    </Container>
  );
}

export default CarSearchForm;
