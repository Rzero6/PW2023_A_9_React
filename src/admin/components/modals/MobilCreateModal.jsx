import { Modal, Button, Spinner, Form, Row, Col } from "react-bootstrap";
import { FaImage, FaPlusSquare } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InputForm from "../forms/InputFloatingFormDark";
import { SelectForm } from "../forms/SelectForm";
import { CreateMobil } from "../../../api/apiMobil";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  tipeOptions,
  bahanBakarOptions,
  transmisiOptions,
} from "./MobilFormOptions";

const ModalCreateMobil = ({ cabang, onClose, isLoading }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    nama: "",
    tahun: "",
    harga_sewa: "",
    jml_tempat_duduk: "",
    no_polisi: "",
  });

  const [selectedTipe, setSelectedTipe] = useState("mpv");
  const handleSelectTipe = (value) => {
    setSelectedTipe(value);
  };
  const [selectedBahanBakar, setSelectedBahanBakar] = useState("bensin");
  const handleSelectBahanBakar = (value) => {
    setSelectedBahanBakar(value);
  };
  const [selectedTransmisi, setSelectedTransmisi] = useState("matic");
  const handleSelectTransmisi = (value) => {
    setSelectedTransmisi(value);
  };
  const [selectedCabang, setSelectedCabang] = useState("");
  const handleSelectCabang = (event) => {
    setSelectedCabang(event.target.value);
  };
  const [isPending, setIsPending] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const handleClose = () => {
    setShow(false);
    setThumbnail(null);
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
    if (!thumbnail) {
      toast.dark("Pilih gambar");
      return;
    }
    setIsPending(true);
    const formData = new FormData();
    formData.append("nama", data.nama);
    formData.append("tahun", data.tahun);
    formData.append("jml_tempat_duduk", data.jml_tempat_duduk);
    formData.append("harga_sewa", data.harga_sewa);
    formData.append("no_polisi", data.no_polisi);
    formData.append("tipe", selectedTipe);
    formData.append("bahan_bakar", selectedBahanBakar);
    formData.append("transmisi", selectedTransmisi);
    formData.append("id_cabang", selectedCabang);
    formData.append("image", thumbnail);
    CreateMobil(formData)
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
  const handleThumbnail = (event) => {
    setThumbnail(event.target.files[0]);
  };
  useEffect(() => {
    if (cabang.length > 0) {
      setSelectedCabang(cabang[0].id);
    }
  }, [cabang]);
  return (
    <>
      <Button variant="light" onClick={handleShow} disabled={isLoading}>
        <FaPlusSquare className="mx-1 mb-1" />
        Tambah
      </Button>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Mobil Baru</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitData}>
          <Modal.Body>
            <Row>
              <Col>
                <div
                  className="d-flex img-preview text-center position-relative mb-3"
                  style={{ aspectRatio: "16 / 9", maxWidth: "50vh" }}
                >
                  {thumbnail ? (
                    <img
                      src={URL.createObjectURL(thumbnail)}
                      alt="Thumbnail"
                      className="w-100 h-100 object-fit-cover"
                    />
                  ) : (
                    <img
                      src="https://placehold.co/1600x900"
                      alt="Thumbnail"
                      className="w-100 h-100 object-fit-cover"
                    />
                  )}
                  <Button
                    variant="primary"
                    type="button"
                    disabled={isPending}
                    size="sm"
                    className="w-fit h-fit position-absolute bottom-0 end-0 me-3 mb-3"
                    onClick={() => document.getElementById("thumbnail").click()}
                  >
                    <FaImage /> Pilih Gambar
                  </Button>
                  {/* Input type file yang disembunyikan, diakses pakai tombol diatas */}
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    className="d-none"
                    onChange={handleThumbnail}
                    accept="image/*"
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
                        value={cabang.length > 0 ? cabang[0].id : ""}
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
                onChange={handleChange}
                required
              />
              <Col md={6}>
                <InputForm
                  type="number"
                  label="Harga Sewa"
                  name="harga_sewa"
                  placeholder="Masukkan Harga"
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
export default ModalCreateMobil;
