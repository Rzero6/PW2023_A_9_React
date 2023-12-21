import { Card, Container, Alert } from "react-bootstrap";
import { GetTransaksiByUserAndStatus } from "../../../api/apiTransaksi";
import { useState, useEffect } from "react";
import { GetMobilById } from "../../../api/apiMobil";
import { Loading } from "../../../admin/components/loading/Loading";
import { getImageMobil } from "../../../api";
const PesananComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transaksi, setTransaksi] = useState(null);
  const [mobil, setMobil] = useState(null);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const transaksiResponse = await GetTransaksiByUserAndStatus("berjalan");
      if (transaksiResponse.length > 0) {
        console.log(transaksiResponse[0].id_mobil);
        const mobilResponse = await GetMobilById(transaksiResponse[0].id_mobil);
        setTransaksi(transaksiResponse[0]);
        setMobil(mobilResponse);
      }
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
      {isLoading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "90vh" }}
        >
          <Loading />
        </div>
      ) : transaksi ? (
        <Card>
          <Card.Body>
            <Card.Title>
              <h3 className="text-center">
                <strong>Kamu Sedang Menyewa Mobil ini</strong>
              </h3>
            </Card.Title>
            <div className="d-flex justify-content-center">
              <img
                src={getImageMobil(mobil.image)}
                className="card-img-top"
                alt="kaleb"
                style={{ height: "40vh", width: "100vh", objectFit: "contain" }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title center-text">{mobil.nama}</h5>
              <p className="card-text center-text">
                Pick Up : {transaksi.pickup} - Drop Off : {transaksi.dropoff}
              </p>
              <p className="card-text center-text">
                <small className="text-body-secondary">
                  Waktu PickUp: {transaksi.waktu_pickup} - Waktu DropOff:{" "}
                  {transaksi.waktu_pickup}
                </small>
              </p>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "90vh" }}
        >
          <Alert variant="secondary" className="mt-3 text-center">
            Belum ada yang disewa, ayo nyewa!
          </Alert>
        </div>
      )}
    </Container>
  );
};

export default PesananComponent;
