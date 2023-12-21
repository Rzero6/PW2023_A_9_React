import { Modal, Button, Spinner, Form } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import InputForm from "../forms/InputFloatingFormDark";
import { UpdateCabang } from "../../../api/apiCabang";

const ModalEditCabang = ({ cabang, onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(cabang);
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
    UpdateCabang(data)
      .then((response) => {
        setIsPending(false);
        toast.success(response.message);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        toast.dark(err.message);
      });
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FaPencilAlt className="mx-1 mb-1" />
        Edit
      </Button>
      <Modal size="md" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Cabang Baru</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitData}>
          <Modal.Body>
            <InputForm
              type="text"
              label="Nama"
              name="nama"
              placeholder="Masukkan Nama"
              value={data?.nama}
              onChange={handleChange}
              required
            />
            <InputForm
              type="text"
              label="Kota"
              name="kota"
              placeholder="Masukkan Kota"
              value={data?.kota}
              onChange={handleChange}
              required
            />
            <InputForm
              type="text"
              label="Alamat"
              name="alamat"
              placeholder="Masukkan Alamat"
              value={data?.alamat}
              onChange={handleChange}
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
                <span>Simpan</span>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default ModalEditCabang;
