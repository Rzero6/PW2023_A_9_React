import React from "react";
import { toast } from "react-toastify";
import { Modal, Button, Row, Col, Form, Spinner } from "react-bootstrap";
import { getImageMobil } from "../../../api";
import { useState, useEffect } from "react";
import { CreateTransaksi } from "../../../api/apiTransaksi";
const ModalCreateTransaksi = ({ mobil, transaksi }) => {
  const [selectedPembayaran, setSelectedPembayaran] = useState("Visa");
  const [show, setShow] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleSelectPembayaran = (event) => {
    setSelectedPembayaran(event.target.value);
  };
  const submitData = (event) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData();
    formData.append("id_mobil", mobil.id);
    formData.append("id_cabang_pickup", transaksi.id_cabang_pickup);
    formData.append("id_cabang_dropoff", transaksi.id_cabang_dropoff);
    formData.append("waktu_pickup", transaksi.waktu_pickup);
    formData.append("waktu_dropoff", transaksi.waktu_dropoff);
    formData.append("metode_pembayaran", selectedPembayaran);
    CreateTransaksi(formData)
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
      <Button variant="primary" className="w-100" onClick={handleShow}>
        Sewa
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sewa {mobil.nama}</Modal.Title>
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
                    <p>{mobil?.harga_sewa}</p>
                  </Col>
                  <Col>
                    <p>{mobil?.tipe}</p>
                  </Col>
                  <Col>
                    <p>{mobil?.transmisi}</p>
                  </Col>
                  <Col>
                    <p>{mobil?.bahan_bakar}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <p>{mobil?.nama}</p>
              <Col md={6}>
                <p>{mobil?.tahun}</p>
              </Col>
              <Col md={6}>
                <p>{mobil?.jml_tempat_duduk}</p>
              </Col>
              <Col md={6}>
                <p>{mobil?.no_polisi}</p>
              </Col>
              <Col md={6}>
                <Form.Select
                  value={selectedPembayaran}
                  onChange={handleSelectPembayaran}
                >
                  <option value="Visa">Visa</option>
                  <option value="Debit">Debit</option>
                  <option value="Cash">Cash</option>
                </Form.Select>
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

export default ModalCreateTransaksi;
