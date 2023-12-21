import { Outlet } from "react-router-dom";
// import component
import TopNavbar from "../Components/Partials/Navbar/TopNavbar";
//mengatur route yang akan ditampilkan di navbar
const routes = [
  {
    path: "/home",
    name: "Home",
  },
  {
    path: "/home/profile",
    name: "Profil",
  },
  {
    path: "/home/pesanan",
    name: "Pesanan",
  },
  {
    path: "/home/riwayat",
    name: "Riwayat",
  },
];
const UserLayout = ({ children }) => {
  return (
    <div className="mt-4 pt-5">
      <TopNavbar routes={routes} />
      {children ? children : <Outlet />}
    </div>
  );
};
export default UserLayout;
