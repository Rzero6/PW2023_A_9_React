import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCar } from "@fortawesome/free-solid-svg-icons";
import "./NavbarStyle.css";

const Navbar = ({page, pathUrl}) => {

  // mengecek apakah user memiliki cookie
  const hasCookie = document.cookie.length > 0;


  // handle logout
  const handleLogout = () => {
    // Remove all cookies by setting their expiration dates to the past
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    });

    window.location.reload()
  };

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
            href={pathUrl || "/pesanan"}
          >
            <FontAwesomeIcon icon={faCar} className="me-3" />
            {page || "Pesanan"}
          </a>
          <hr className="m-0" />
        </div>
        <div className="offcanvas-footer">
          <div className="d-flex justify-content-center">
          {hasCookie && (
            <button className="btn btn-danger me-2 flex-grow-1 m-3" onClick={handleLogout}>
              Logout
            </button>
          )}
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
          {hasCookie ? (
            <a
              className="text-decoration-none btn text-white d-flex align-items-center"
              data-bs-toggle="offcanvas"
              href="#offcanvasProfil"
              role="button"
            >
              <FontAwesomeIcon
                icon={faUser}
                className="border border-2 border-light rounded-circle p-2 me-2"
              />
              Kunarto Dira Patsy
            </a>
          ) : (
            <a className="btn me-2" href="/login" style={{backgroundColor: 'white'}}>
              Login
            </a>
          )}
        </div>
      </nav>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default Navbar;
