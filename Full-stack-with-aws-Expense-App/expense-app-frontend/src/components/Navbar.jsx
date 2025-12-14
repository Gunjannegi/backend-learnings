import { GiTakeMyMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth";
import { IoDiamondOutline } from "react-icons/io5";
import { initializeSDK } from "../lib/cashfree";

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, userInfo } = useAuth();

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
        <div className="bg-blue-950 p-4 text-white font-medium flex items-center justify-between">
            <div className="flex gap-2 items-center text-xl">
                <GiTakeMyMoney />
                <p>Day to Day Expenses</p>
            </div>

            {isAuthenticated && (
                <div className="flex gap-4">
                    {userInfo && !userInfo.isPremium && <div className="flex gap-2 items-center">
                        <IoDiamondOutline />
                        <button onClick={handlePay} className="cursor-pointer">Upgrade</button>
                    </div>}
                    <button className="cursor-pointer" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
