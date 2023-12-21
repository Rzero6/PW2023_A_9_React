import React from "react";
import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Row, Modal, Button, Stack, Card } from "react-bootstrap";
import { GetAllUsers } from "../../../api/apiUser";
import { Alert } from "react-bootstrap";
import { tableHeader } from "./TableHeader";
import CustomTable from "../../components/table/CustomTable";
import { Loading } from "../../components/loading/Loading";

const User = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const fetchUser = () => {
    setIsLoading(true);
    GetAllUsers()
      .then((response) => {
        setUser(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container className="p-5">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-white text-nowrap">User</h1>
        <hr className="border-top border-light opacity-50 w-100" />
      </Stack>
      {isLoading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "75vh" }}
        >
          <Loading />
        </div>
      ) : user?.length > 0 ? (
        <Row className="justify-content-center align-items-center">
          <CustomTable
            data={user}
            tableHeader={tableHeader}
            handleRowClick={handleRowClick}
          />
        </Row>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "75vh" }}
        >
          <Alert variant="secondary" className="mt-3 text-center">
            Belum ada User....
          </Alert>
        </div>
      )}

      {/* Modal component */}
      {showModal && selectedRow && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Data : <strong>{selectedRow.nama}</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stack gap={2}>
              <Button variant="primary" className="w-100">
                Edit
              </Button>
              <Button variant="danger" className="w-100">
                Delete
              </Button>
            </Stack>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default User;
