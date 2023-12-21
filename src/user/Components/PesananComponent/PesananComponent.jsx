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
      const mobilResponse = await GetMobilById(transaksiResponse.id_mobil);
      setTransaksi(transaksiResponse);
      setMobil(mobilResponse);
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
    <Container>
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
            <div className="card mb-3">
              <img
                src={getImageMobil(mobil.image)}
                className="card-img-top"
                alt="kaleb"
              />
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
