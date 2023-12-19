import React from "react";
import { Container } from "react-bootstrap";
import FormRegister from "../../components/forms/FormRegister";
import "./Form.css";
const AdminRegisterPage = () => {
  return (
    <Container className="login-container">
      <div className="login-box">
        <div className="text-center mb-3">
          <h1 className="mt-3 pb-1 fw-bold text-light">Admin Sign Up</h1>
        </div>
        <FormRegister />
      </div>
    </Container>
  );
};
export default AdminRegisterPage;
