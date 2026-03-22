import { GiTakeMyMoney } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth";
import { IoDiamondOutline, IoMenu, IoClose } from "react-icons/io5";
import { initializeSDK } from "../lib/cashfree";
import { FaCrown } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, userInfo } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handlePay = async () => {
    const res = await fetch("http://localhost:3000/payment/create-order", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 199 }),
    });

    const data = await res.json();
    const cashfree = await initializeSDK();

    await cashfree.checkout({
      paymentSessionId: data.paymentSessionId,
      redirectTarget: "_self",
    });
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-blue-950 text-white px-4 py-3 sticky top-0">
        <div className="flex items-center justify-between">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">
            {/* HAMBURGER (mobile only) */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <IoClose /> : <IoMenu />}
            </button>

            {/* LOGO */}
            <GiTakeMyMoney className="text-2xl" />

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex gap-3">
              <Link
                to="/dashboard"
                className={`px-3 py-1 rounded ${pathname === "/dashboard" ? "bg-gray-500" : ""
                  }`}
              >
                Dashboard
              </Link>

              {userInfo?.isPremium && (
                  <Link
                    to="/reports"
                    className={`px-3 py-1 rounded ${pathname === "/reports" ? "bg-gray-500" : ""
                      }`}
                  >
                    Reports
                  </Link>
              )}
            </div>
            {userInfo?.isPremium && <div className="flex items-center gap-2 font-semibold bg-yellow-400 rounded-2xl text-sm text-black px-4 py-1">
              <FaCrown className="" />
              Pro
            </div>}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {!userInfo?.isPremium && (
              <button
                onClick={handlePay}
                className="hidden md:flex gap-1 items-center"
              >
                <IoDiamondOutline />
                Upgrade
              </button>
            )}

            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 border-t border-blue-800 pt-4">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="px-2"
            >
              Dashboard
            </Link>

            {userInfo?.isPremium && (
              <Link
                to="/reports"
                onClick={() => setIsOpen(false)}
                className="px-2"
              >
                Reports
              </Link>
            )}

            {!userInfo?.isPremium && (
              <button
                onClick={handlePay}
                className="flex gap-2 items-center px-2"
              >
                <IoDiamondOutline />
                Upgrade
              </button>
            )}
          </div>
        )}
      </nav>

    </>
  );
};

export default Navbar;
