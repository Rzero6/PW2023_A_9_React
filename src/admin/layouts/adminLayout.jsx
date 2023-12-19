import { SidebarComp } from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { FaUser, FaCar, FaMoneyBillWave, FaBuilding } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const routes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    path: "/admin/dashboard/user",
    name: "Pengguna",
    icon: <FaUser />,
  },
  {
    path: "/admin/dashboard/cabang",
    name: "Cabang",
    icon: <FaBuilding />,
  },
  {
    path: "/admin/dashboard/mobil",
    name: "Mobil",
    icon: <FaCar />,
  },
  {
    path: "/admin/dashboard/transaksi",
    name: "Transaksi",
    icon: <FaMoneyBillWave />,
  },
];

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <div className="flex-shrink-1">
        <SidebarComp routes={routes} />
      </div>
      <div className="flex-grow-1">{children ? children : <Outlet />}</div>
    </div>
  );
};

export default AdminLayout;
