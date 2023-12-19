import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdLogout } from "react-icons/md";
import { MenuItem } from "react-pro-sidebar";

const LogoutConfirmation = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    toast.success("Loggedout");
    navigate("/admin");
  };
  return (
    <>
      <MenuItem icon={<MdLogout />} onClick={handleShow}>
        Logout
      </MenuItem>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin logout ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutConfirmation;
