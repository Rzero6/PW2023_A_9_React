import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchFilteringComponents = () => {
  const [showDropOffLocation, setShowDropOffLocation] = useState(false);
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
  const [dropOffSuggestions, setDropOffSuggestions] = useState([]);

  const handleCheckboxChange = () => {
    setShowDropOffLocation(!showDropOffLocation);
  };

  useEffect(() => {
    // Lakukan permintaan AJAX untuk mendapatkan data lokasi dari server
    axios
      .get(`http://localhost:5000/search`)
      .then((response) => {
        const locations = response.data.data.locations;
        // Ambil daftar kota dari objek lokasi yang diterima dari server
        const cities = Object.values(locations).map(
          (location) => location.kota
        );
        setPickUpSuggestions(cities);
        setDropOffSuggestions(cities);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  const handlePickUpLocationChange = (event) => {
    const value = event.target.value;
    setPickUpLocation(value);
  };

  const handleDropOffLocationChange = (event) => {
    const value = event.target.value;
    setDropOffLocation(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const searchData = {
      pickUpLocation,
      dropOffLocation,
    };

    // Kirim permintaan menggunakan Axios
    axios
      .get(`http://localhost:5000/search`, {
        params: searchData,
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePickUpDateChange = (e) => {
    const selectedPickUpDate = e.target.value;
  };

  const handleDropOffDateChange = (e) => {
    const selectedDropOffDate = e.target.value;
  };

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  return (
    <>
      <div className="container">
        <div className="row-cols mt-4">
          <form onSubmit={handleFormSubmit}>
            <div className="m-auto align-items-center justify-content-center">
              <div className="card">
                <div className="card-body form-group">
                  <div className="row d-flex justify-content-center">
                    <div className="col-sm-7">
                      <div className="d-flex justify-content-sm-between">
                        <label
                          className="form-check-label me-auto"
                          htmlFor="pick_up_location"
                        >
                          <i className="fa fa-location-dot"></i> Lokasi
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
                            className="form-control mb-1 mt-1"
                            type="search"
                            id="pick_up_location"
                            placeholder="Tempat Ambil"
                            required
                            value={pickUpLocation}
                            onChange={handlePickUpLocationChange}
                            list="pick-up-suggestions"
                          />
                          <datalist id="pick-up-suggestions">
                            {pickUpSuggestions.map((suggestion, index) => (
                              <option key={index} value={suggestion} />
                            ))}
                          </datalist>
                        </div>
                        <div
                          className="drop-off-location flex-grow-1 ms-2"
                          style={{ display: showDropOffLocation ? 'block' : 'none' }}
                          id="dropOffLocationTextField"
                        >
                          <input
                            className="form-control mb-1 mt-1"
                            type="search"
                            id="drop_off_location"
                            placeholder="Tempat Kembali"
                            required
                            value={dropOffLocation}
                            onChange={handleDropOffLocationChange}
                            list="drop-off-suggestions"
                          />
                          <datalist id="drop-off-suggestions">
                            {dropOffSuggestions.map((suggestion, index) => (
                              <option key={index} value={suggestion} />
                            ))}
                          </datalist>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-auto">
                      <div className="row">
                        <label
                          className="form-check-label"
                          htmlFor="pick_up_date"
                        >
                          <i className="fa fa-calendar-days"></i> Waktu
                          Pengambilan & Pengembalian
                        </label>
                      </div>
                      <div className="row">
                        <div className="col-md-auto">
                          <input
                            className="form-control mb-1 mt-1"
                            type="date"
                            id="pick_up_date"
                            name="pick_up_date"
                            min={today}
                            defaultValue={today}
                            onChange={handlePickUpDateChange}
                          />
                        </div>
                        <div className="col-md-auto">
                          <input
                            className="form-control mb-1 mt-1"
                            type="date"
                            id="drop_off_date"
                            name="drop_off_date"
                            min={tomorrow}
                            defaultValue={tomorrow}
                            onChange={handleDropOffDateChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-auto d-flex justify-content-center align-items-center">
                      <button
                        type="submit"
                        className="btn btn-success"
                        style={{ maxWidth: "400px" }}
                        id="searchBtn"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchFilteringComponents;
