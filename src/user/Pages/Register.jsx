import InputFormRegister from "../Components/InputFormComponents/InputFormRegister";
import { Container } from "react-bootstrap";

const Register = () => {
  return (
    <Container className="login-container">
      <div className="login-box">
        <div className="text-center mb-3">
          <h1 className="mt-3 pb-1 fw-bold text-light">Sign Up</h1>
        </div>
        <InputFormRegister />
      </div>
    </Container>
  );
};

export default Register;
