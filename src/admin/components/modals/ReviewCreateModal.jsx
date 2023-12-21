import { Modal, Button, Spinner, Form } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import InputForm from "../forms/InputFloatingFormDark";
import { CreateReview } from "../../../api/apiReview";

const ModalCreateReview = ({ onClose, transaksi }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    rating: "",
    komen: "",
    id_transaksi: transaksi.id,
  });
  const [isPending, setIsPending] = useState(false);
  const handleClose = () => {
    setShow(false);
    onClose();
  };
  const handleShow = () => setShow(true);
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const submitData = (event) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData();
    formData.append("rating", data.rating);
    formData.append("komen", data.komen);
    formData.append("id_transaksi", data.id_transaksi);
    CreateReview(formData)
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
        <FaPlusSquare className="mx-1 mb-1" />
        Review
      </Button>
      <Modal size="md" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Review</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitData}>
          <Modal.Body>
            <InputForm
              type="number"
              label="Masukkan Rating 1-10"
              name="rating"
              placeholder="Masukkan Rating 1-10"
              onChange={handleChange}
              required
            />
            <InputForm
              as="textarea"
              label="Komen"
              name="komen"
              placeholder="Masukkan komen"
              onChange={handleChange}
              style={{ height: "8rem" }}
              required
            />
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
                <span>Review</span>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateReview;
