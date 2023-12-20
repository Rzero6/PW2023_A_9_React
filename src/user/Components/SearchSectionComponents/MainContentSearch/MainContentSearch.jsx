import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faGears, faGasPump, faChair } from "@fortawesome/free-solid-svg-icons";
import {
  faCarSide,
  faCarOn,
  faTruck,
  faVanShuttle,
} from "@fortawesome/free-solid-svg-icons";
import ReviewItem from "../ReviewItem/ReviewItem";
import axios from "axios";



import "./MainContentSearchStyle.css"

const MainContentSearch = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedCarType, setSelectedCarType] = useState("mobil");
  const [selectedMobil, setSelectedMobil] = useState(null);

  const handleCarTypeChange = (carType) => {
    setSelectedCarType(carType);
  };
  const [mobils, setMobils] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/search");
        setMobils(response.data.data.mobil);
        setReviews(response.data.data.reviews)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleShowPesanan = (event) => {
    const mobilData = JSON.parse(event.currentTarget.dataset.mobil);
    setSelectedMobil(mobilData);
  };

  const today = new Date().toLocaleDateString();
  const [returnDate, setReturnDate] = useState(
    new Date(
      new Date().getTime() + 3 * 24 * 60 * 60 * 1000
    ).toLocaleDateString()
  );

  return (
    <>
      <div className="container mt-3">
        <div className="row mt-3">
          <div className="col">
            <div className="mapouter m-3">
              <div className="gmap_canvas">
                <iframe
                  className="gmap_iframe"
                  width="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=yogyakarta babarsari 123&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              </div>
            </div>
            {/* Card Filter */}
            <div className="card card-custom" style={{ maxWidth: "400px", width: "100%" }}>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Filter</h5>
                  <button className="btn text-primary" type="reset">
                    Hapus semua filter
                  </button>
                </div>
                <hr />
                <h6>Harga per hari</h6>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priceRange"
                    id="lowPrice"
                    value="low"
                  />
                  <label className="form-check-label" htmlFor="lowPrice">
                    Rp. 0 - Rp. 200,000
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priceRange"
                    id="mediumPrice"
                    value="medium"
                  />
                  <label className="form-check-label" htmlFor="mediumPrice">
                    Rp. 200,000 - Rp. 500,000
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priceRange"
                    id="highPrice"
                    value="high"
                  />
                  <label className="form-check-label" htmlFor="highPrice">
                    Rp. 500,000 - Rp. 1,000,000
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priceRange"
                    id="veryHighPrice"
                    value="veryHigh"
                  />
                  <label className="form-check-label" htmlFor="veryHighPrice">
                    Rp. 1,000,000++
                  </label>
                </div>
                <hr />
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-success w-100"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#filterModal"
                  >
                    Semua Filter
                  </button>
                </div>
              </div>
            </div>

            {/* FILTERING TIPE KENDARAAN */}
            <div
              className="col-md-auto flex-grow-1"
              style={{ maxWidth: "800px" }}
            >
              <div className="card card-custom d-inline-flex m-3">
                <div className="d-flex align-content-start flex-wrap">
                  <div
                    className={`type-car-picker p-2 ${
                      selectedCarType === "mobil" ? "selected-car-type" : ""
                    } d-flex flex-grow-1`}
                    data-car-type="mobil"
                    onClick={() => handleCarTypeChange("mobil")}
                  >
                    <p>
                      <FontAwesomeIcon icon={faCarSide} /> Mobil
                    </p>
                  </div>
                  <div
                    className={`type-car-picker p-2 ${
                      selectedCarType === "sport" ? "selected-car-type" : ""
                    } d-flex flex-grow-1`}
                    data-car-type="sport"
                    onClick={() => handleCarTypeChange("sport")}
                  >
                    <p>
                      <FontAwesomeIcon icon={faCarOn} /> Sport
                    </p>
                  </div>
                  <div
                    className={`type-car-picker p-2 ${
                      selectedCarType === "truk" ? "selected-car-type" : ""
                    } d-flex flex-grow-1`}
                    data-car-type="truk"
                    onClick={() => handleCarTypeChange("truk")}
                  >
                    <p>
                      <FontAwesomeIcon icon={faTruck} /> Truk
                    </p>
                  </div>
                  <div
                    className={`type-car-picker p-2 ${
                      selectedCarType === "bus" ? "selected-car-type" : ""
                    } d-flex flex-grow-1`}
                    data-car-type="bus"
                    onClick={() => handleCarTypeChange("bus")}
                  >
                    <p>
                      <FontAwesomeIcon icon={faVanShuttle} /> Bus
                    </p>
                  </div>
                </div>
                <input
                  type="hidden"
                  id="selected-car-type"
                  name="selected-car-type"
                  value={selectedCarType}
                />
              </div>
            </div>

            <div className="mobil-list-container">
              {mobils.map((mobil, index) => (
                <div className="card card-custom p-3 m-3" key={index}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-auto">
                        <img
                          className="img-fluid rounded"
                          src={mobil.foto_mobil}
                          alt="Not Found"
                        />
                      </div>

                      <div className="col-md-auto flex-grow-1">
                        <div className="row-cols">
                          <h1>{mobil.nama}</h1>
                          <p>Tempat duduk: {mobil.jumlah_tempat_duduk} Kursi</p>
                          <p>Bahan bakar: {mobil.bahan_bakar}</p>
                          <p>Transmisi: {mobil.transmisi}</p>
                          <p>Warna: {mobil.warna}</p>
                          <p>Tahun: {mobil.tahun_buat}</p>
                        </div>
                      </div>

                      <div className="col-md-auto flex-grow-1 d-flex align-items-end">
                        <div
                          className="flex-fill"
                          style={{ textAlign: "right" }}
                        >
                          <h3>
                            Rp.{" "}
                            {new Intl.NumberFormat("id-ID").format(
                              mobil.harga_sewa
                            )}
                            /Hari
                          </h3>
                          <button
                            className="btn btn-success show-pesanan"
                            id={`pesanBtn${index}`}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#pesananModal"
                            onClick={handleShowPesanan}
                            data-mobil={JSON.stringify(mobil)}
                          >
                            Pesan sekarang
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-auto d-flex justify-content-md-start">
                        <p
                          className={`${
                            mobil.rating >= 8
                              ? "bg-success"
                              : mobil.rating > 4
                              ? "bg-warning"
                              : "bg-danger"
                          } text-white p-2 rounded fw-bold d-flex justify-content-center align-items-center`}
                          style={{ width: "0 auto", height: "40px" }}
                        >
                          <FontAwesomeIcon
                            icon={faStar}
                            className="me-1"
                            style={{ color: "#ffea00" }}
                          />
                          {mobil.rating}
                        </p>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#reviewModal"
                          type="button"
                          data-mobil={JSON.stringify(mobil)}
                          className={`show-review btn ms-3 ${
                            mobil.rating >= 8
                              ? "bg-success"
                              : mobil.rating > 4
                              ? "bg-warning"
                              : "bg-danger"
                          } text-white p-2 rounded fw-bold`}
                        >
                          {mobil.rating === 10
                            ? "Super Great"
                            : mobil.rating >= 8
                            ? "Very Good"
                            : mobil.rating >= 6
                            ? "Good"
                            : mobil.rating >= 4
                            ? "Not Bad"
                            : "Bad"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "end", marginTop: "20px" }}>
              Pengambilan dan Pengembalian dilayani hanya pada jam buka (09.00 -
              17.00)
            </p>
          </div>
        </div>
      </div>

      {/* MODAL FILTER */}
      <div className="modal fade" id="filterModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Filter</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4">
                  <h6>Bahan Bakar</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="bahanBakar"
                      id="bensin"
                      value="Bensin"
                    />
                    <label className="form-check-label" htmlFor="bensin">
                      Bensin
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="bahanBakar"
                      id="elektrik"
                      value="Elektrik"
                    />
                    <label className="form-check-label" htmlFor="elektrik">
                      Elektrik
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="bahanBakar"
                      id="hybrid"
                      value="Hybrid"
                    />
                    <label className="form-check-label" htmlFor="hybrid">
                      Hybrid
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <h6>Tempat Duduk</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tempatDuduk"
                      id="2"
                      value="2"
                    />
                    <label className="form-check-label" htmlFor="2">
                      2
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tempatDuduk"
                      id="4"
                      value="4"
                    />
                    <label className="form-check-label" htmlFor="4">
                      4
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tempatDuduk"
                      id="6Lebih"
                      value="6"
                    />
                    <label className="form-check-label" htmlFor="6">
                      6++
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <h6>Transmisi</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="transmisi"
                      id="matic"
                      value="matic"
                    />
                    <label className="form-check-label" htmlFor="matic">
                      Matic
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="transmisi"
                      id="manual"
                      value="manual"
                    />
                    <label className="form-check-label" htmlFor="manual">
                      Manual
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="reset" className="btn btn-danger">
                Hapus Filter
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PESANAN */}
      <div className="modal fade" id="pesananModal" data-bs-backdrop="static">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" style={{ textAlign: "center" }}>
                Konfirmasi Pesanan
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4">
                  <h5>Pengambilan</h5>
                  <h3>Yogyakarta</h3>
                  <h4>{today}</h4>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                  <span style={{ fontSize: "70px", textAlign: "center" }}>
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
                <div className="col-md-4">
                  <h5>Pengembalian</h5>
                  <h3>Yogyakarta</h3>
                  <h4>{returnDate}</h4>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-4">
                  <h5 id="namaMobil">{selectedMobil?.nama}</h5>
                  <img
                    className="img-fluid rounded mt-2"
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                    id="gambarMobil"
                    src={selectedMobil?.foto_mobil}
                    alt="Rusak"
                  />
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-md-start align-items-center">
                    <FontAwesomeIcon icon={faGears} className="me-1" />
                    <p id="transmisiMobil">{selectedMobil?.transmisi}</p>
                  </div>
                  <div className="d-flex justify-content-md-start align-items-center">
                    <FontAwesomeIcon icon={faGasPump} className="me-1" />
                    <p id="bahanbakarMobil">{selectedMobil?.bahan_bakar}</p>
                  </div>
                  <div className="d-flex justify-content-md-start align-items-center">
                    <FontAwesomeIcon icon={faChair} className="me-1" />
                    <p id="tempatdudukMobil">{selectedMobil?.jumlah_tempat_duduk} Tempat Duduk</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <h5 id="totalBiayaMobil"></h5>
                  <select
                    className="form-select mt-3"
                    value={selectedPayment}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  >
                    <option selected hidden>
                      Metode Pembayaran
                    </option>
                    <option value="Cash">Cash</option>
                    <option value="Bank">Transfer Bank</option>
                    <option value="EWallet">E-Wallet</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="reset"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Batal
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Bayar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEW MODAL */}
      <div className="modal fade" id="reviewModal">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitleReview">Review</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {reviews.map((review, index) => (
              <ReviewItem key={index} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

    </>
  );
};

export default MainContentSearch;
