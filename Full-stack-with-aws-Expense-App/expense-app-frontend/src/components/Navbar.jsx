import { GiTakeMyMoney } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth";
import { IoDiamondOutline, IoMenu, IoClose } from "react-icons/io5";
import { initializeSDK } from "../lib/cashfree";
import { FaCrown } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useState } from "react";
import LeaderboardModal from "./LeaderboardModal";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, userInfo } = useAuth();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
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
      {/* PREMIUM BANNER */}
      {userInfo?.isPremium && (
        <div className="flex justify-between items-center px-4 py-2 bg-linear-to-br from-yellow-400 via-yellow-300 to-yellow-600 text-amber-900 text-sm sticky top-0">
          <div className="flex items-center gap-2 font-semibold">
            <FaCrown />
            <HiSparkles />
            Premium User
            <HiSparkles />
            <FaCrown />
          </div>

          <button
            onClick={() => setShowLeaderboard(true)}
            className="bg-amber-900/20 hover:bg-amber-900/30 px-2 py-1 rounded-lg"
          >
            Leaderboard
          </button>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="bg-blue-950 text-white px-4 py-3 sticky top-11">
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
                className={`px-3 py-1 rounded ${
                  pathname === "/dashboard" ? "bg-gray-500" : ""
                }`}
              >
                Dashboard
              </Link>

              {userInfo?.isPremium && (
                <Link
                  to="/reports"
                  className={`px-3 py-1 rounded ${
                    pathname === "/reports" ? "bg-gray-500" : ""
                  }`}
                >
                  Reports
                </Link>
              )}
            </div>
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

      <LeaderboardModal open={showLeaderboard} onClose={setShowLeaderboard} />
    </>
  );
};

export default Navbar;
