import { Modal, Button, Spinner, Form } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import InputForm from "../../../admin/components/forms/InputFloatingFormDark";
import { UpdateUser } from "../../../api/apiUser";

const ModalEditProfile = ({ user, onClose }) => {
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false);
  const [data, setData] = useState({
    id: user.id,
    nama: user.nama,
    email: user.email,
    password: "",
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
    if (!check) {
      const updatedData = { ...data };
      delete updatedData.password;
      setData(updatedData);
    }
    UpdateUser(data)
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
          <Modal.Title>Edit Pofile</Modal.Title>
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
              label="Email"
              name="email"
              placeholder="Masukkan Email"
              value={data?.email}
              onChange={handleChange}
              required
            />

            <Form.Check
              type="checkbox"
              id={`checkbox`}
              label="Ganti Password Juga ?"
              value={check}
              onChange={() => setCheck(!check)}
            />
            {check && (
              <InputForm
                type="password"
                label="Password"
                name="password"
                placeholder="Masukkan Password"
                value={data?.password}
                onChange={handleChange}
                required
              />
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
                <span>Simpan</span>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default ModalEditProfile;
