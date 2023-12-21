import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
/* eslint-disable react/prop-types */
const AdminProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  useEffect(() => {
    const tokenDariSS = sessionStorage.getItem("token");
    const role = JSON.parse(sessionStorage.getItem("user")).role;
    setToken(tokenDariSS);
    if (!tokenDariSS && role === 0) {
      navigate("/admin");
    }
  }, [navigate]);
  return token && (children ? children : <Outlet />);
};
export default AdminProtectedRoutes;
