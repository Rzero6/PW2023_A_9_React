import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "../admin/pages/HomePage";
import Cabang from "../admin/pages/Cabang";
import User from "../admin/pages/UserPage";
import Mobil from "../admin/pages/MobilPage";
import Transaksi from "../admin/pages/TransaksiPage";
import AdminLayout from "../admin/layouts/adminLayout";
import AdminProtectedRoutes from "./AdminProtectedRoutes";
import { AdminLoginPage } from "../admin/pages/auth/LoginPage";
import AdminRegisterPage from "../admin/pages/auth/RegisterPage";
import FormLogin from "../components/forms/FormLogin";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    children: [
      {
        path: "/",
        element: <FormLogin />,
      },
      {
        path: "/register",
        element: <FormLogin />,
      },
    ],
  },
  {
    children: [
      {
        path: "/admin",
        element: <AdminLoginPage />,
      },
      {
        path: "/admin/register",
        element: <AdminRegisterPage />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminProtectedRoutes>
        <AdminLayout />
      </AdminProtectedRoutes>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <Home />,
      },
      {
        path: "/admin/dashboard/user",
        element: <User />,
      },
      {
        path: "/admin/dashboard/cabang",
        element: <Cabang />,
      },
      {
        path: "/admin/dashboard/mobil",
        element: <Mobil />,
      },
      {
        path: "/admin/dashboard/transaksi",
        element: <Transaksi />,
      },
    ],
  },
]);
const AppRouter = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <RouterProvider router={router} />
    </>
  );
};
export default AppRouter;
