import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const TopNavbar = ({ routes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar fixed="top" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
          tabIndex={0}
        >
          <div className="text-white">rentalmobil.com</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {routes?.map((route, index) => (
              <Nav.Link key={index} onClick={() => navigate(route.path)}>
                <Button
                  variant={route.name === "Home" ? "primary" : "light"}
                  className="w-100"
                >
                  {route.name}
                </Button>
              </Nav.Link>
            ))}
            {/* Log out */}
            <Nav.Link onClick={logout}>
              <Button variant="danger" className="w-100">
                Log Out
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
