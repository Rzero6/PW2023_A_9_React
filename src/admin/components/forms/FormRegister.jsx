import { Button, Alert, Spinner, Form } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputFloatingForm from "./InputFloatingForm";
import { SignUp } from "../../../api/apiAuthAdmin";

const FormRegister = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    nama: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  //Using Axios
  const Register = (event) => {
    event.preventDefault();
    SignUp(data)
      .then((res) => {
        navigate("/admin");
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
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
      <Button type="submit" className="mt-3 w-100 border-0 buttonSubmit btn-lg">
        Register
      </Button>
      <p className="text-end text-white mt-2">
        Already Have an Account? <Link to="/admin">Click Here!</Link>
      </p>
    </Form>
  );
};
export default FormRegister;
