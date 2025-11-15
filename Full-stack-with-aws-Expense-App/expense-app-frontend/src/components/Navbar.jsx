import { GiTakeMyMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./context/auth";

const Navbar = () => {
    const navigate = useNavigate();
    const {isAuthenticated, logout} = useAuth();

    const handleLogout = () => {
       logout()

        navigate("/login");
    };

    return (
        <div className="bg-blue-950 p-4 text-white font-medium flex items-center justify-between">
            <div className="flex gap-2 items-center text-xl">
                <GiTakeMyMoney />
                <p>Day to Day Expenses</p>
            </div>

            {isAuthenticated && (
                <button className="cursor-pointer" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </div>
    );
};

export default Navbar;
