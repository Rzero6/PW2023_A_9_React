import React from "react";
import { useState } from "react";
import { Button, Alert, Spinner, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputFloatingForm from "../../../admin/components/forms/InputFloatingFormLight";
import { SignIn } from "../../../api/apiAuthUser";

const InputFormLogin = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const newData = { ...data, [event.target.name]: event.target.value };
    setData(newData);
    if (newData.email.trim().length > 0 && newData.password.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const handleAdminButton = () => {
    navigate("/admin");
  };
  //Using Axios
  const Login = (event) => {
    event.preventDefault();
    setLoading(true);
    SignIn(data)
      .then((res) => {
        navigate("/home");
        sessionStorage.setItem("token", res.access_token);
        sessionStorage.setItem("user", JSON.stringify(res.user));
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
        toast.dark(err.message);
        setLoading(false);
      });
  };
  //Using Axios
  return (
    <Form
      style={{ maxWidth: "800px", margin: "auto" }}
      className="p-4"
      onSubmit={Login}
    >
      <Alert variant="primary" className="mb-5 alertColor">
        <p className="mb-0 lead">
          <strong>Kunarto-Patsy-Dira</strong> Rental
        </p>
        <p className="mb-0">Selamat datang, Silahkan login.</p>
      </Alert>
      <InputFloatingForm
        label="Email"
        placeholder="Masukkan Email"
        name="email"
        type="email"
        onChange={handleChange}
      />
      <InputFloatingForm
        label="Password"
        placeholder="Masukkan Password"
        name="password"
        type="password"
        autoComplete="off"
        onChange={handleChange}
      />
      <Button
        type="submit"
        disabled={isDisabled || loading}
        className="mt-3 w-100 border-0 buttonSubmit btn-lg"
      >
        {loading ? (
          <Spinner animation="border" variant="light" size="sm" />
        ) : (
          <span>Login</span>
        )}
      </Button>
      <p className="text-end mt-2 text-white">
        Belum Punya Akun? <Link to="/register">Klik Sini!</Link>
      </p>
      <Button variant="primary" className="w-100" onClick={handleAdminButton}>
        Halaman Admin
      </Button>
    </Form>
  );
};

export default InputFormLogin;
