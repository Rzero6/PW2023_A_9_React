import { Modal, Button, Spinner, Form } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import InputForm from "../forms/InputFloatingFormDark";
import { CreateCabang } from "../../../api/apiCabang";

const ModalCreateCabang = ({ onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    nama: "",
    kota: "",
    alamat: "",
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
    formData.append("nama", data.nama);
    formData.append("kota", data.kota);
    formData.append("alamat", data.alamat);
    CreateCabang(formData)
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
      <Button variant="light" onClick={handleShow}>
        <FaPlusSquare className="mx-1 mb-1" />
        Tambah
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
              onChange={handleChange}
              required
            />
            <InputForm
              type="text"
              label="Kota"
              name="kota"
              placeholder="Masukkan Kota"
              onChange={handleChange}
              required
            />
            <InputForm
              type="text"
              label="Alamat"
              name="alamat"
              placeholder="Masukkan Alamat"
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
export default ModalCreateCabang;
