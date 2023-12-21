import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
/* eslint-disable react/prop-types */
const AdminProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  useEffect(() => {
    const tokenDariSS = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    setToken(tokenDariSS);
    if (user.role === 0) {
      toast.dark("Unauthorized");
      navigate("/");
    }
    if (!tokenDariSS && role === 0) {
      navigate("/admin");
    }
  }, [navigate]);
  return token && (children ? children : <Outlet />);
};
export default AdminProtectedRoutes;
