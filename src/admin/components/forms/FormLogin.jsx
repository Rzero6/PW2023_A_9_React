import { useState } from "react";
import { Button, Alert, Spinner, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputFloatingForm from "./InputFloatingForm";
import { SignIn } from "../../../api/apiAuthAdmin";
const FormLogin = () => {
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
  //Using Axios
  const Login = (event) => {
    event.preventDefault();
    setLoading(true);
    SignIn(data)
      .then((res) => {
        if (res.user.role === 0)
          throw new Error("Maaf hanya admin yang bisa akses");
        navigate("/admin/dashboard");
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
        <p className="mb-0">Selamat datang Admin, Silahkan login.</p>
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
        variant="primary"
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
        Admin Register Hanya Untuk Demo <Link to="/admin/register">Klik Sini!</Link>
      </p>
    </Form>
  );
};
export default FormLogin;
