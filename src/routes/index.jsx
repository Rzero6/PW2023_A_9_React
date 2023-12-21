import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomeAdmin from "../admin/pages/HomePage";
import Cabang from "../admin/pages/cabang/Cabang";
import User from "../admin/pages/user/UserPage";
import Mobil from "../admin/pages/mobil/MobilPage";
import Transaksi from "../admin/pages/transaksi/TransaksiPage";
import AdminLayout from "../admin/layouts/adminLayout";
import AdminProtectedRoutes from "./AdminProtectedRoutes";
import { AdminLoginPage } from "../admin/pages/auth/LoginPage";
import AdminRegisterPage from "../admin/pages/auth/RegisterPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../user/Pages/Login";
import Register from "../user/Pages/Register";
import UserLayout from "../user/Layout/UserLayout";
import Home from "../user/Pages/Home";
import Profile from "../user/Pages/Profile";
import Pesanan from "../user/Pages/Pesanan";
import Riwayat from "../user/Pages/Riwayat";
import Review from "../user/Pages/Review";
import Search from "../user/Pages/Search";
const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/home",
    element: (
      <ProtectedRoutes>
        <UserLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/home/profile",
        element: <Profile />,
      },
      {
        path: "/home/pesanan",
        element: <Pesanan />,
      },
      {
        path: "/home/riwayat",
        element: <Riwayat />,
      },
      {
        path: "/home/review",
        element: <Review />,
      },
      {
        path: "/home/search",
        element: <Search />,
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
        element: <HomeAdmin />,
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
