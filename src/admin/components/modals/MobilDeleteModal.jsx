import React from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Modal, Button, Spinner } from "react-bootstrap";
import { DeleteMobil } from "../../../api/apiMobil";
import { toast } from "react-toastify";
const ModalDeleteMobil = ({ data, onClose }) => {
  const [show, setShow] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const handleClose = () => {
    setShow(false);
    onClose();
  };
  const handleShow = () => setShow(true);
  const deleteContent = (id) => {
    setIsPending(true);
    DeleteMobil(id)
      .then((response) => {
        setIsPending(false);
        toast.success(response.message);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        toast.dark(err.message);
        setIsPending(false);
        handleClose();
      });
  };
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        <FaTrash className="mx-1 mb-1" />
        Hapus
      </Button>
      <Modal size="md" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Apakah anda yakin ingin menghapus <strong>{data.nama}</strong> ?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteContent(data.id)}
            disabled={isPending}
          >
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
              <span>Hapus</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteMobil;
