import { Button, Alert, Spinner, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputFloatingForm from "../../../admin/components/forms/InputFloatingFormLight";
import { SignUp } from "../../../api/apiAuthUser";
const InputFormRegister = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    nama: "",
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    if (
      data.nama.trim().length > 0 &&
      data.email.trim().length > 0 &&
      data.password.length > 7
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [data]);
  //Using Axios
  const Register = (event) => {
    setLoading(true);
    event.preventDefault();
    SignUp(data)
      .then((res) => {
        setLoading(false);
        toast.success(res.message);
        setTimeout(() => {
          if (window.confirm("Ke halaman Login ?")) navigate("/");
        }, 100);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setLoading(false);
      });
  };
  //Using Axios
  return (
    <Form
      style={{ maxWidth: "800px", margin: "auto" }}
      onSubmit={Register}
      className="p-4"
    >
      <Alert variant="primary" className="mb-5 alertColor">
        <strong>Info!</strong> Semua form wajib diisi.
      </Alert>
      <InputFloatingForm
        type="text"
        label="Nama"
        name="nama"
        onChange={handleChange}
        placeholder="Masukkan Nama"
        required
      />
      {/* <InputForm type="file" label="Image" name="image" /> */}
      <InputFloatingForm
        type="email"
        label="Email"
        name="email"
        onChange={handleChange}
        placeholder="Masukkan Email"
        required
      />
      <InputFloatingForm
        type="password"
        label="Password"
        name="password"
        onChange={handleChange}
        placeholder="Masukkan Password"
        autoComplete="off"
        minlength="8"
        required
      />
      <Button
        type="submit"
        className="mt-3 w-100 border-0 buttonSubmit btn-lg"
        disabled={isDisabled || loading}
      >
        {loading ? (
          <Spinner animation="border" variant="light" size="sm" />
        ) : (
          <span>Register</span>
        )}
      </Button>
      <p className="text-end text-white mt-2">
        Sudah punya akun? <Link to="/">Klik sini!</Link>
      </p>
    </Form>
  );
};

export default InputFormRegister;
