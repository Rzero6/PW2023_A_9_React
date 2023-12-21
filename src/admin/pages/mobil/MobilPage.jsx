import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Row, Modal, Button, Stack } from "react-bootstrap";
import { GetAllMobil } from "../../../api/apiMobil";
import { GetCabangById } from "../../../api/apiCabang";
import { Alert } from "react-bootstrap";
import CustomTable from "../../components/table/CustomTable";
import { tableHeader } from "./TableHeader";
import { Loading } from "../../components/loading/Loading";
import ModalCreateMobil from "../../components/modals/MobilCreateModal";
import ModalDeleteMobil from "../../components/modals/MobilDeleteModal";
import ModalEditMobil from "../../components/modals/MobilEditModal";
import { GetAllCabang } from "../../../api/apiCabang";
const Mobil = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mobil, setMobil] = useState([]);
  const [cabang, setCabang] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const fetchMobil = async () => {
    setIsLoading(true);
    try {
      const mobilResponse = await GetAllMobil();
      const cabangResponse = await GetAllCabang();
      const mobilWithData = await Promise.all(
        mobilResponse.map(async (mobil) => {
          const cabangData = await GetCabangById(mobil.id_cabang);
          const cabang = cabangData.kota;
          return {
            ...mobil,
            cabang: cabang,
          };
        })
      );
      setCabang(cabangResponse);
      setMobil(mobilWithData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMobil();
  }, []);
  const handleCloseModals = () => {
    fetchMobil();
    setShowModal(false);
  };

  return (
    <Container className="p-5">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-white text-nowrap">Mobil</h1>
        <hr className="border-top border-light opacity-50 w-100" />
        <div className="ms-auto text-nowrap">
          <ModalCreateMobil
            cabang={cabang}
            onClose={fetchMobil}
            isLoading={isLoading}
          />
        </div>
      </Stack>
      {isLoading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "75vh" }}
        >
          <Loading />
        </div>
      ) : mobil?.length > 0 ? (
        <Row className="justify-content-center align-items-center">
          <CustomTable
            tableHeader={tableHeader}
            data={mobil}
            handleRowClick={handleRowClick}
          />
        </Row>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "75vh" }}
        >
          <Alert variant="secondary" className="mt-3 text-center">
            Belum ada Mobil....
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
              <ModalEditMobil 
              cabang={cabang}
              mobil={selectedRow}
              onClose={handleCloseModals}
              />
              <ModalDeleteMobil
                data={selectedRow}
                onClose={handleCloseModals}
              />
            </Stack>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Mobil;
