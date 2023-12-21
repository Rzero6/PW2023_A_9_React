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
                className="card-img w-100 h-100 object-fit-cover bg-light"
                alt="..."
              />
              <Card.Body>
                <Card.Title>{item.nama}</Card.Title>
                <Card.Text>{item.harga_sewa}</Card.Text>
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
