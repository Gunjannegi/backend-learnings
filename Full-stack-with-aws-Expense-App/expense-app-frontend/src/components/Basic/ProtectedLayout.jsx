import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
