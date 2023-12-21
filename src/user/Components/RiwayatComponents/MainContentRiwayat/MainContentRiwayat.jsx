import { Container, Row, Col, Card, Stack, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Loading } from "../../../../admin/components/loading/Loading";
import { GetAllTransaksi } from "../../../../api/apiTransaksi";
import ModalCreateReview from "../../../../admin/components/modals/ReviewCreateModal";
const MainContentRiwayat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transaksiDone, setTransaksiDone] = useState([]);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [transaksiReviewed, setTransaksiReviewed] = useState([]);
  const fetchTransaksi = () => {
    setIsLoading(true);
    GetAllTransaksi()
      .then((response) => {
        const filterDone = response.filter((item) => {
          return item.status === "selesai" && item.id_peminjam === user.id;
        });
        const filterRated = response.filter((item) => {
          return item.status === "dinilai" && item.id_peminjam === user.id;
        });
        console.log("Filtered Result:", filterRated);
        setTransaksiDone(filterDone);
        setTransaksiReviewed(filterRated);
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
        ) : transaksiDone.length > 0 ? (
          transaksiDone.map((item) => (
            <Col key={item.id}>
              <Card>
                <Card.Body>
                  <Stack direction="horizontal" gap={3}>
                    <p>Mobil: {item.mobil}</p>
                    <p>Pickup: {item.dropoff}</p>
                    <p>Dropoff: {item.dropoff}</p>
                    <ModalCreateReview
                      onClose={fetchTransaksi}
                      transaksi={item}
                    />
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          ))
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
        ) : transaksiReviewed.length > 0 ? (
          transaksiReviewed.map((item) => (
            <Col key={item.id}>
              <Card>
                <Card.Body>
                  <Stack direction="horizontal" gap={3}>
                    <p>Mobil: {item.mobil}</p>
                    <p>Pickup: {item.dropoff}</p>
                    <p>Dropoff: {item.dropoff}</p>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          ))
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
