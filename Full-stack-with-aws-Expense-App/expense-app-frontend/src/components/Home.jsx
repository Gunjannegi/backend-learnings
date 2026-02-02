import { useState } from "react";
import { useAuth } from "./context/auth";
import { Navigate } from "react-router-dom";
import { GiTakeMyMoney } from "react-icons/gi";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
    const { isAuthenticated } = useAuth();
    const [mode, setMode] = useState("login");

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">

            {/* LEFT */}
            <div className="w-full md:w-2/3 flex flex-col justify-center  bg-blue-950 text-white px-6 md:px-16 py-16 md:py-0 relative">

                <div className="absolute top-4 left-6 md:top-6 md:left-16 flex items-center gap-2">
                    <GiTakeMyMoney className="text-3xl" />
                    <span className="text-xl font-semibold tracking-wide">
                        Day2Day Expenses
                    </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Track your daily expenses effortlessly
                </h1>

                <p className="text-gray-300 max-w-md text-sm md:text-base">
                    Manage expenses, unlock premium insights, and stay financially smart.
                </p>
            </div>

            {/* RIGHT */}
            <div className="w-full md:w-1/3 flex items-center justify-center bg-white text-black py-12 md:py-0">
                <div className="w-full max-w-sm px-4">
                    {mode === "login" ? (
                        <>
                            <Login />
                            <p className="text-sm mt-4 text-center">
                                Don’t have an account?{" "}
                                <button
                                    className="text-red-800 underline"
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
                                    className="text-red-800 underline"
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