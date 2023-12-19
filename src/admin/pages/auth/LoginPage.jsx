import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import FormLogin from "../../components/forms/FormLogin";
import "./Form.css";
export const AdminLoginPage = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const tokenDariSS = sessionStorage.getItem("token");
    setToken(tokenDariSS);
    if (tokenDariSS) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);
  return (
    !token && (
      <Container className="login-container">
        <div className="login-box">
          <div className="text-center mb-3">
            <h1 className="mt-3 pb-1 fw-bold text-light">Admin Sign In</h1>
          </div>
          <FormLogin />
        </div>
      </Container>
    )
  );
};
