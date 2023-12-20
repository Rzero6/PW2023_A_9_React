import React from "react";
import { useState, useEffect } from "react";
import { Alert, Container, Row, Modal, Button, Stack } from "react-bootstrap";
import { GetAllCabang } from "../../../api/apiCabang";
import { GetMobilByCabang } from "../../../api/apiMobil";
import ModalCreateCabang from "../../components/modals/CabangCreateModal";
import { tableHeader } from "./TableHeader";
import { Loading } from "../../components/loading/Loading";
import CustomTable from "../../components/table/CustomTable";
import ModalEditCabang from "../../components/modals/CabangEditModal";
import ModalDeleteCabang from "../../components/modals/CabangDeleteModal";

const Cabang = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cabang, setCabang] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };
  const fetchCabang = async () => {
    setIsLoading(true);
    try {
      const cabangResponse = await GetAllCabang();
      const cabangWithData = await Promise.all(
        cabangResponse.map(async (cabang) => {
          const mobilData = await GetMobilByCabang(cabang.id);
          const totalMobil = mobilData.length;
          const mobilDisewa = mobilData.filter((mobil) => mobil.disewa).length;
          const menganggur = totalMobil - mobilDisewa;
          return {
            ...cabang,
            total_mobil: totalMobil,
            disewa: mobilDisewa,
            nganggur: menganggur,
          };
        })
      );

      setCabang(cabangWithData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCabang();
  }, []);

  const handleCloseModals = () => {
    fetchCabang();
    setShowModal(false);
  };

  return (
    <Container className="p-5">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-white text-nowrap">Cabang</h1>
        <hr className="border-top border-light opacity-50 w-100" />
        <div className="ms-auto text-nowrap">
          <ModalCreateCabang onClose={fetchCabang}></ModalCreateCabang>
        </div>
      </Stack>
      {isLoading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "75vh" }}
        >
          <Loading />
        </div>
      ) : cabang?.length > 0 ? (
        <Row className="justify-content-center align-items-center">
          <CustomTable
            tableHeader={tableHeader}
            data={cabang}
            handleRowClick={handleRowClick}
          />
        </Row>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "75vh" }}
        >
          <Alert variant="secondary" className="mt-3 text-center">
            Belum ada Cabang....
          </Alert>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedRow && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Data : <strong>{selectedRow.nama}</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stack gap={2}>
              <ModalEditCabang
                cabang={selectedRow}
                onClose={handleCloseModals}
              />
              <ModalDeleteCabang
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

export default Cabang;
