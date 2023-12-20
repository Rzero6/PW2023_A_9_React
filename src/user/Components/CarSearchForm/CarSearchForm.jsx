import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faCarOn,
  faTruck,
  faVanShuttle,
  faLocationDot,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

import "./carPicker.css";

function CarSearchForm() {
  const [showDropOffLocation, setShowDropOffLocation] = useState(false);
  const [selectedCar, setSelectedCar] = useState('mobil');

  const handleCarClick = (carType) => {
    setSelectedCar(carType);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleCheckboxChange = () => {
    setShowDropOffLocation(!showDropOffLocation);
  };

  return (
    <div className="container">
      <form action="/search" onSubmit={handleSubmit}>
        <div className="m-auto px-5 align-items-center justify-content-center">
          <div className="card">
            <div className="card-body form-group">
              <h6 className="row-cols">Kendaraan tipe apa yang dicari ?</h6>
              <div className="card mb-3 d-inline-flex">
                <div className="d-flex flex-wrap">
                  {["mobil", "sport", "truk", "bus"].map((carType) => (
                    <div
                      key={carType}
                      className={`flex-grow-1 type-car-picker p-2 col-12 col-md-6 col-lg-3  ${
                        selectedCar === carType ? "selected-car-type" : ""
                      }`}
                      data-car-type={carType}
                      onClick={() => handleCarClick(carType)}
                    >
                      <p>
                        <FontAwesomeIcon
                          icon={
                            carType === "mobil"
                              ? faCarSide
                              : carType === "sport"
                              ? faCarOn
                              : carType === "truk"
                              ? faTruck
                              : faVanShuttle
                          }
                        />
                        <span className="ms-2">{carType}</span>
                      </p>
                    </div>
                  ))}
                </div>
                <input
                  type="hidden"
                  id="selected-car-type"
                  name="selected-car-type"
                />
              </div>
              <div className="row">
                <div className="col-sm-8 flex-grow-1">
                  <div className="d-flex justify-content-sm-between">
                    <label
                      className="form-check-label me-auto"
                      htmlFor="pick_up_location"
                    >
                      <FontAwesomeIcon icon={faLocationDot} /> Lokasi
                      Pengambilan & Pengembalian
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="true"
                        id="sameLocationCheckBox"
                        checked={!showDropOffLocation}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="sameLocationCheckBox"
                      >
                        Tempat Pengembalian yang sama
                      </label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="pick-up-location flex-grow-1">
                      <input
                        className="form-control mb-3 mt-1"
                        type="search"
                        id="pick_up_location"
                        placeholder="Tempat Ambil"
                        required
                      />
                      <div className="suggestions-wrapper">
                        <ul
                          className="list-group suggestions-box"
                          id="suggestions"
                        ></ul>
                      </div>
                    </div>
                    <div
                      className="drop-off-location flex-grow-1 ms-2"
                      style={{
                        display: showDropOffLocation ? "block" : "none",
                      }}
                      id="dropOffLocationTextField"
                    >
                      <input
                        className="form-control mb-3 mt-1"
                        type="search"
                        id="drop_off_location"
                        placeholder="Tempat Kembali"
                        required
                      />
                      <div className="suggestions-wrapper">
                        <ul
                          className="list-group suggestions-box"
                          id="suggestions"
                        ></ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-auto flex-grow-1">
                  <div className="row">
                    <label className="form-check-label" htmlFor="pick_up_date">
                      <FontAwesomeIcon icon={faCalendarDays} /> Waktu
                      Pengambilan & Pengembalian
                    </label>
                  </div>
                  <div className="row flex-grow-1">
                    <div className="col-md-6">
                      <input
                        className="form-control mb-1 mt-1"
                        type="date"
                        id="pick_up_date"
                        min={new Date().toISOString().split("T")[0]}
                        defaultValue={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control mb-1 mt-1"
                        type="date"
                        id="drop_off_date"
                        defaultValue={
                          new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                            .toISOString()
                            .split("T")[0]
                        }
                        min={
                          new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                            .toISOString()
                            .split("T")[0]
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-cols d-flex align-items-center justify-content-center mt-2">
                <Link to="/search">
                  <button
                    className="btn btn-success flex-grow-1"
                    style={{ maxWidth: "300px" }}
                    id="searchBtn"
                  >
                    Search
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CarSearchForm;
