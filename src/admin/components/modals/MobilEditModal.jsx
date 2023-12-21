import { Modal, Button, Spinner, Form, Row, Col } from "react-bootstrap";
import { FaImage, FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import InputForm from "../forms/InputFloatingFormDark";
import { SelectForm } from "../forms/SelectForm";
import { UpdateMobil } from "../../../api/apiMobil";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getImageMobil } from "../../../api";
import {
  tipeOptions,
  bahanBakarOptions,
  transmisiOptions,
} from "./MobilFormOptions";

const ModalEditMobil = ({ mobil, cabang, onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(mobil);

  const [selectedTipe, setSelectedTipe] = useState(mobil.tipe);
  const handleSelectTipe = (value) => {
    setSelectedTipe(value);
  };
  const [selectedBahanBakar, setSelectedBahanBakar] = useState(
    mobil.bahan_bakar
  );
  const handleSelectBahanBakar = (value) => {
    setSelectedBahanBakar(value);
  };
  const [selectedTransmisi, setSelectedTransmisi] = useState(mobil.transmisi);
  const handleSelectTransmisi = (value) => {
    setSelectedTransmisi(value);
  };
  const [selectedCabang, setSelectedCabang] = useState(mobil.id_cabang);
  const handleSelectCabang = (event) => {
    setSelectedCabang(event.target.value);
  };
  const [isPending, setIsPending] = useState(false);
  const handleClose = () => {
    setShow(false);
    onClose();
  };
  const handleShow = () => {
    if (cabang.length > 0) {
      setShow(true);
    } else {
      toast.dark("Buka cabang terlebih dulu");
    }
  };
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const submitData = (event) => {
    event.preventDefault();
    setIsPending(true);
    data.bahan_bakar = selectedBahanBakar;
    data.tipe = selectedTipe;
    data.id_cabang = selectedCabang;
    data.transmisi = selectedTransmisi;
    UpdateMobil(data)
      .then((response) => {
        setIsPending(false);
        toast.success(response.message);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        toast.dark(JSON.stringify(err.message));
      });
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FaPencilAlt className="mx-1 mb-1" />
        Edit
      </Button>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Mobil</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitData}>
          <Modal.Body>
            <Row>
              <Col>
                <div
                  className="d-flex img-preview text-center position-relative mb-3"
                  style={{ aspectRatio: "16 / 9", maxWidth: "50vh" }}
                >
                  <img
                    src={getImageMobil(mobil?.image)}
                    alt="Thumbnail"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <FormControl sx={{ m: 1, minWidth: 150 }} id="id_cabang">
                      <InputLabel>Cabang</InputLabel>
                      <Select
                        id="id_cabang"
                        name="id_cabang"
                        label="Cabang"
                        value={selectedCabang}
                        onChange={handleSelectCabang}
                      >
                        {cabang.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.kota}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Col>
                  <Col>
                    <SelectForm
                      props={{
                        id: "tipe",
                        name: "tipe",
                        label: "Tipe",
                      }}
                      selectedValue={selectedTipe}
                      onChange={handleSelectTipe}
                      options={tipeOptions}
                    />
                  </Col>
                  <Col>
                    <SelectForm
                      props={{
                        id: "bahan_bakar",
                        name: "bahan_bakar",
                        label: "Bahan Bakar",
                      }}
                      selectedValue={selectedBahanBakar}
                      onChange={handleSelectBahanBakar}
                      options={bahanBakarOptions}
                    />
                  </Col>
                  <Col>
                    <SelectForm
                      props={{
                        id: "transmisi",
                        name: "transmisi",
                        label: "Transmisi",
                      }}
                      selectedValue={selectedTransmisi}
                      onChange={handleSelectTransmisi}
                      options={transmisiOptions}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <InputForm
                type="text"
                label="Nama"
                name="nama"
                placeholder="Masukkan Nama"
                value={data?.nama}
                onChange={handleChange}
                required
              />
              <Col md={6}>
                <InputForm
                  type="number"
                  label="Harga Sewa"
                  name="harga_sewa"
                  placeholder="Masukkan Harga"
                  value={data?.harga_sewa}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={6}>
                <InputForm
                  type="text"
                  label="No Polisi"
                  name="no_polisi"
                  placeholder="Masukkan No Polisi"
                  value={data?.no_polisi}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={6}>
                <InputForm
                  type="number"
                  label="Kapasitas"
                  name="jml_tempat_duduk"
                  placeholder="Masukkan Kapasitas"
                  value={data?.jml_tempat_duduk}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={6}>
                <InputForm
                  type="number"
                  label="Tahun Keluar"
                  name="tahun"
                  placeholder="Masukkan Tahun"
                  value={data?.tahun}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <span>Simpan</span>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default ModalEditMobil;
