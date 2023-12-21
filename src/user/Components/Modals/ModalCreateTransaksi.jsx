import React from "react";
import { toast } from "react-toastify";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  Spinner,
  Stack,
  Alert,
} from "react-bootstrap";
import { getImageMobil } from "../../../api";
import { useState, useEffect } from "react";
import { CreateTransaksi } from "../../../api/apiTransaksi";
import { GetReviewByMobilId } from "../../../api/apiReview";
import { Loading } from "../../../admin/components/loading/Loading";
import { Link, useNavigate } from "react-router-dom";
const ModalCreateTransaksi = ({ mobil, transaksi }) => {
  const navigate = useNavigate();
  const [selectedPembayaran, setSelectedPembayaran] = useState("Visa");
  const [show, setShow] = useState(false);
  const [review, setReview] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
        navigate("/home/pesanan");
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        toast.dark(JSON.stringify(err.message));
      });
  };
  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const reviewResponse = await GetReviewByMobilId(mobil.id);
      setReview(reviewResponse);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <>
      <Button variant="primary" className="w-100" onClick={handleShow}>
        Sewa
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} centered scrollable>
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
                  <Col md={6}>
                    <p>Harga Sewa: Rp.{mobil?.harga_sewa}/Hari</p>
                  </Col>
                  <Col md={6}>
                    <p>Tipe: {mobil?.tipe}</p>
                  </Col>
                  <Col md={6}>
                    <p>Transmisi: {mobil?.transmisi}</p>
                  </Col>
                  <Col md={6}>
                    <p>Bahan Bakar: {mobil?.bahan_bakar}</p>
                  </Col>
                  <Col md={6}>
                    <p>Tahun: {mobil?.tahun}</p>
                  </Col>
                  <Col md={6}>
                    <p>No. Polisi: {mobil?.no_polisi}</p>
                  </Col>
                  <Col md={6}>
                    <p>Kapasitas Tempat: {mobil?.jml_tempat_duduk}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <p>
                <strong>{mobil?.nama}</strong>
              </p>
              <Col md={12}>
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
            <Stack direction="horizontal" gap={3} className="mt-3">
              <h1 className="h4 fw-bold mb-0 text-nowrap">Reviews</h1>
              <hr className="border-top border-dark w-100" />
              <div className="ms-auto text-nowrap"></div>
            </Stack>

            {isLoading ? (
              <Loading />
            ) : review.length > 0 ? (
              <Row style={{ overflowY: "auto", maxHeight: "100px" }}>
                {review.map((item, index) => (
                  <Col key={item.id} md={12}>
                    <Stack direction="horizontal" gap={3}>
                      <p>{index + 1}.</p>
                      <p>
                        Rating: <strong>{item.rating}/10</strong>
                      </p>
                      <p>{item.komen}</p>
                    </Stack>
                  </Col>
                ))}
              </Row>
            ) : (
              <Alert variant="secondary" className="mt-3 text-center">
                Belum ada Review....
              </Alert>
            )}
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
                <span>Sewa</span>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateTransaksi;
