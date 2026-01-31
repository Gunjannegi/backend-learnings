import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useAuth } from "./context/auth";
import { Navigate } from "react-router-dom";
import { GiTakeMyMoney } from "react-icons/gi";

const Home = () => {
    const { isAuthenticated } = useAuth();
    const [mode, setMode] = useState("login"); // login | signup

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen flex bg-blue-950 text-white">

            {/* LEFT SIDE */}
            <div className="w-2/3 flex flex-col justify-center px-16 relative">

                {/* LOGO */}
                <div className="absolute top-6 left-16 flex items-center gap-2 text-white">
                    <GiTakeMyMoney className="text-3xl" />
                    <span className="text-xl font-semibold tracking-wide">
                        Day2Day Expenses
                    </span>
                </div>

                <h1 className="text-4xl font-bold mb-4">
                    Track your daily expenses effortlessly
                </h1>

                <p className="text-gray-300 max-w-md">
                    Manage expenses, unlock premium insights, and stay financially smart.
                </p>
            </div>


            {/* RIGHT SIDE */}
            <div className="w-1/3 flex items-center justify-center bg-white text-black">
                <div className="w-[400px]">
                    {mode === "login" ? (
                        <>
                            <Login />
                            <p className="text-sm mt-4 text-center">
                                Don’t have an account?{" "}
                                <button
                                    className="text-red-800 underline cursor-pointer"
                                    onClick={() => setMode("signup")}
                                >
                                    Sign up
                                </button>
                            </p>
                        </>
                    ) : (
                        <>
                            <Signup />
                            <p className="text-sm mt-4 text-center">
                                Already have an account?{" "}
                                <button
                                    className="text-red-800 underline cursor-pointer"
                                    onClick={() => setMode("login")}
                                >
                                    Login
                                </button>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
