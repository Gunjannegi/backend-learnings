import { GiTakeMyMoney } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth";
import { IoDiamondOutline } from "react-icons/io5";
import { initializeSDK } from "../lib/cashfree";
import { FaCrown } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useState } from "react";
import LeaderboardModal from "./LeaderboardModal";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, userInfo } = useAuth();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handlePay = async () => {
    const res = await fetch("http://localhost:3000/payment/create-order", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: 199 })
    });

    const data = await res.json();
    const cashfree = await initializeSDK();

    await cashfree.checkout({
      paymentSessionId: data.paymentSessionId,
      redirectTarget: "_self"
    });
  };

  return (
    <>
      {/* PREMIUM BANNER */}
      {userInfo?.isPremium && (
        <div className="flex text-amber-900 tracking-wide px-4 py-2 bg-linear-to-br from-yellow-400 via-yellow-300 to-yellow-600">
          <div className="mx-auto font-semibold flex items-center gap-2">
            <FaCrown />
            <HiSparkles />
            You are a premium user now
            <HiSparkles />
            <FaCrown />
          </div>

          <button
            onClick={() => setShowLeaderboard(true)}
            className="bg-amber-900/20 hover:bg-amber-900/30 px-2 py-1 rounded-lg text-sm"
          >
            Show Leaderboard
          </button>
        </div>
      )}

      {/* MAIN NAVBAR */}
      <div className="bg-blue-950 px-4 text-white font-medium flex items-center justify-between">
        <div className="flex gap-2 items-center text-xl">
          <GiTakeMyMoney />

          <Link
            to="/dashboard"
            className={`p-2 text-lg ${
              pathname === "/dashboard" ? "bg-gray-500 rounded" : ""
            }`}
          >
            Dashboard
          </Link>

          {userInfo?.isPremium && (
            <Link
              to="/reports"
              className={`p-2 text-lg ${
                pathname === "/reports" ? "bg-gray-500 rounded" : ""
              }`}
            >
              Reports
            </Link>
          )}
        </div>

        <div className="flex gap-4 items-center">
          {!userInfo?.isPremium && (
            <button
              onClick={handlePay}
              className="flex gap-2 items-center cursor-pointer"
            >
              <IoDiamondOutline />
              Upgrade
            </button>
          )}

          <button onClick={handleLogout} className="cursor-pointer">
            Logout
          </button>
        </div>
      </div>

      <LeaderboardModal
        open={showLeaderboard}
        onClose={setShowLeaderboard}
      />
    </>
  );
};

export default Navbar;
