import { GiTakeMyMoney } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth";
import { IoDiamondOutline } from "react-icons/io5";
import { initializeSDK } from "../lib/cashfree";
import { FaCrown } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useState } from "react";
import LeaderboardModal from "./LeaderboardModal";


const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, userInfo } = useAuth();
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [selected, setSelected] = useState("dashboard");

    const handleLogout = () => {
        logout()

        navigate("/login");
    };

    const handlePay = async () => {
        const res = await fetch("http://localhost:3000/payment/create-order", {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: 199
            })
        });

        const data = await res.json();
        const paymentSessionId = data.paymentSessionId;


        // 2. Initialize SDK
        const cashfree = await initializeSDK();

        // 3. Open Payment popup
        await cashfree.checkout({
            paymentSessionId,
            redirectTarget: "_self",
        });
    }

    return (
        <>{isAuthenticated ?
            <>
                {userInfo && userInfo.isPremium &&
                    <div className="flex text-amber-900 tracking-wide px-4 py-2 bg-linear-to-br from-yellow-400 via-yellow-300 to-yellow-600">
                        <div className="mx-auto font-semibold flex items-center justify-center gap-2">
                            <FaCrown className="text-amber-900" />
                            <HiSparkles className="text-amber-900" />
                            You are a premium user now
                            <HiSparkles className="text-amber-900" />
                            <FaCrown className="text-amber-900" />
                        </div>

                        <button onClick={() => setShowLeaderboard(true)} className="bg-amber-900/20 hover:bg-amber-900/30 text-amber-900 border-amber-900/30 px-2 py-1 rounded-lg text-sm cursor-pointer">Show Leaderboard</button>
                    </div>}
                <div className="bg-blue-950 px-4 text-white font-medium flex items-center justify-between">
                    <div className="flex gap-2 items-center text-xl">
                        <GiTakeMyMoney />
                        <Link className={`${selected==="dashboard" ? "bg-gray-500":""} p-2 text-lg`} to='/dashboard' onClick={()=>setSelected("dashboard")}>Dashboard</Link>
                        {userInfo && userInfo.isPremium && <Link className={`${selected==="reports" ? "bg-gray-500":""} p-2 text-lg`} to='/reports' onClick={()=>setSelected('reports')}>Reports</Link>}
                    </div>
                    <div className="flex gap-4">
                        {userInfo && !userInfo.isPremium && <div className="flex gap-2 items-center">
                            <IoDiamondOutline />
                            <button onClick={handlePay} className="cursor-pointer">Upgrade</button>
                        </div>}
                        <button className="cursor-pointer" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </> :
            <> <div className="bg-blue-950 p-4 text-white font-medium flex items-center justify-between">
                <div className="flex gap-2 items-center text-xl">
                    <GiTakeMyMoney />
                    <p>Day to Day Expenses</p>
                </div>
            </div></>
        }

            <LeaderboardModal
                open={showLeaderboard}
                onClose={setShowLeaderboard}
            />
        </>
    );
};

export default Navbar;
