import React from "react";
import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Row, Modal, Button, Stack } from "react-bootstrap";
import {
  GetAllTransaksi,
  UpdateTransaksiStatus,
} from "../../../api/apiTransaksi";
import { Alert } from "react-bootstrap";
import { tableHeader } from "./TableHeader";
import CustomTable from "../../components/table/CustomTable";
import { Loading } from "../../components/loading/Loading";
import { SelectForm } from "../../components/forms/SelectForm";
import { toast } from "react-toastify";

const Transaksi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [transaksi, setTransaksi] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setSelectedValue(row.status);
    setShowModal(true);
  };

  const statusOptions = [
    { value: "berjalan", label: "Berjalan" },
    { value: "selesai", label: "Selesai" },
    { value: "dinilai", label: "Dinilai" },
    { value: "batal", label: "Batal" },
  ];

  const handleEditData = () => {
    setIsPending(true);
    selectedRow.status = selectedValue;
    UpdateTransaksiStatus(selectedRow)
      .then((response) => {
        setIsPending(false);
        setShowModal(false);
        toast.success(response.message);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        toast.dark(err.message);
      });
  };

  const fetchTransaksi = () => {
    setIsLoading(true);
    GetAllTransaksi()
      .then((response) => {
        setTransaksi(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchTransaksi();
  }, []);

  return (
    <Container className="p-5">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-white text-nowrap">Transaksi</h1>
        <hr className="border-top border-light opacity-50 w-100" />
      </Stack>
      {isLoading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "75vh" }}
        >
          <Loading />
        </div>
      ) : transaksi?.length > 0 ? (
        <Row className="justify-content-center align-items-center">
          <CustomTable
            data={transaksi}
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
            Belum ada Transaksi....
          </Alert>
        </div>
      )}

      {/* Modal component */}
      {showModal && selectedRow && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Data ID : <strong>{selectedRow.id}</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stack gap={2}>
              <SelectForm
                options={statusOptions}
                props={{ id: "status", label: "Status" }}
                selectedValue={selectedValue}
                onChange={handleSelectChange}
              />
              <Button
                variant="primary"
                onClick={handleEditData}
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
                  <span>Simpan</span>
                )}
              </Button>
            </Stack>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Transaksi;
