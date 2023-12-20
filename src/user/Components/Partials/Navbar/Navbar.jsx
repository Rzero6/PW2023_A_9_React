import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCar } from "@fortawesome/free-solid-svg-icons";
import "./NavbarStyle.css";

const Navbar = () => {
  return (
    <div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasProfil"
      >
        <div className="offcanvas-header">
          <h5>
            <FontAwesomeIcon
              icon={faUser}
              className="border border-2 border-dark rounded-circle p-2"
            />{" "}
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <a
            className="btn d-flex align-items-center p-3 rounded-0"
            href="/profile"
          >
            <FontAwesomeIcon icon={faUser} className="me-3" />
            Profil
          </a>
          <hr className="m-0" />
          <a
            className="btn d-flex align-items-center p-3 rounded-0"
            href="/pesanan"
          >
            <FontAwesomeIcon icon={faCar} className="me-3" />
            Pesanan
          </a>
          <hr className="m-0" />
        </div>
        <div className="offcanvas-footer">
          <div className="d-flex justify-content-center">
            <button className="btn btn-danger flex-grow-1 m-3">Logout</button>
          </div>
        </div>
      </div>
      {/* Navbar */}
      <nav className="navbar navbar-dark navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://img.freepik.com/premium-vector/rental-car-logo-design-template-illustration-vector_669794-363.jpg"
              alt="Not Found"
              className="logo border border-1 border-primary rounded"
            />{" "}
            rentalmobil.com
          </a>
          <a
            className="text-decoration-none btn text-white d-flex align-items-center"
            data-bs-toggle="offcanvas"
            href="#offcanvasProfil"
            role="button"
          >
            <FontAwesomeIcon
              icon={faUser}
              className="border border-2 border-light rounded-circle p-2 me-2"
            />{" "}
            Kunarto Dira Patsy
          </a>
        </div>
      </nav>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default Navbar;
