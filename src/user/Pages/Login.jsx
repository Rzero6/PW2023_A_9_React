import InputFormLogin from "../Components/InputFormComponents/InputFormLogin";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
const Login = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const tokenDariSS = sessionStorage.getItem("token");
    setToken(tokenDariSS);
    if (tokenDariSS) {
      navigate("/home");
    }
  }, [navigate]);
  return (
    !token && (
      <Container className="login-container">
        <div className="login-box">
          <div className="text-center mb-3">
            <h1 className="mt-3 pb-1 fw-bold text-light">Sign In</h1>
          </div>
          <InputFormLogin />
        </div>
      </Container>
    )
  );
};

export default Login;
