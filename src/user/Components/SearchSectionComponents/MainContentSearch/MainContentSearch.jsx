import React, { useEffect, useState } from "react";
import "./MainContentSearchStyle.css";
import { Container, Row } from "react-bootstrap";
import { getImageMobil } from "../../../../api";
import { Col, Card, Button } from "react-bootstrap";
import ModalCreateTransaksi from "../../Modals/ModalCreateTransaksi";
const MainContentSearch = ({ transaksi, mobil }) => {
  const [detailsMobil, setDetailsMobil] = useState(null);

  return (
    <Container style={{ height: "90vh" }}>
      <Row className="overflow-auto">
        {mobil?.map((item) => (
          <Col key={item.id} md={6} lg={4}>
            <Card>
              <img
                src={getImageMobil(item.image)}
                className="card-img object-fit-cover bg-light img-fluid"
                alt="..."
                style={{ width: "auto", height: "250px" }}
              />
              <Card.Body>
                <Card.Title>{item.nama}</Card.Title>
                <Card.Text>Harga Sewa: Rp. {item.harga_sewa} per Hari</Card.Text>
                <ModalCreateTransaksi mobil={item} transaksi={transaksi} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MainContentSearch;
