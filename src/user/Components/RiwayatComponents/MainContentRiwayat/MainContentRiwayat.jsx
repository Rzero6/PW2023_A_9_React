import { Container, Row, Col, Card, Stack, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Loading } from "../../../../admin/components/loading/Loading";
import { GetTransaksiByUserAndStatus } from "../../../../api/apiTransaksi";
const MainContentRiwayat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transaksiDone, setTransaksiDone] = useState([]);
  const [transaksiReviewed, setTransaksiReviewed] = useState([]);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const transaksiSelesai = await GetTransaksiByUserAndStatus("selesai");
      const transaksiDinilai = await GetTransaksiByUserAndStatus("dinilai");
      console.log(transaksiSelesai.lenght);
      setTransaksiDone(transaksiSelesai);
      setTransaksiReviewed(transaksiDinilai);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container style={{ height: "90vh" }}>
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-white text-nowrap">Selesai</h1>
        <hr className="border-top border-light opacity-50 w-100" />
        <div className="ms-auto text-nowrap"></div>
      </Stack>
      <Row>
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <Loading />
          </div>
        ) : transaksiDone.lenght > 0 ? (
          <Col>
            <Card></Card>
          </Col>
        ) : (
          <Alert variant="secondary" className="mt-3 text-center">
            Belum ada yang selesai
          </Alert>
        )}
      </Row>
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-white text-nowrap">Dinilai</h1>
        <hr className="border-top border-light opacity-50 w-100" />
        <div className="ms-auto text-nowrap"></div>
      </Stack>
      <Row>
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <Loading />
          </div>
        ) : transaksiReviewed.lenght > 0 ? (
          <Col>
            <Card></Card>
          </Col>
        ) : (
          <Alert variant="secondary" className="mt-3 text-center">
            Belum ada yang dinilai
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default MainContentRiwayat;
