import { useState } from "react";
import Toast from "./Basic/Toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
    const [useremail, setUserEmail] = useState("");
    const [userpassword, setUserPassword] = useState("");
    const [toast, setToast] = useState(null);
    const [isForgotPasswordPopup, setIsForgotPasswordPopup] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleEmail = (e) => {
        setUserEmail(e.target.value)
    };

    const handlePassword = (e) => {
        setUserPassword(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = {
            useremail: useremail,
            userpassword: userpassword
        }
        try {
            const response = await fetch(`http://localhost:3000/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInfo)
            });
            const data = await response.json();
            if (response.ok) {
                setToast({ message: data?.message, type: 'success' });
                login(data);
                navigate('/dashboard');

            } else {
                setToast({ message: data?.message || "Something went wrong", type: "error" });
            }
        } catch (err) {
            setToast({ message: err.message, type: "error" });
        }
    }

    return (
        <>
            <div className="md:min-h-[90vh] w-full flex justify-center items-center m-0">
                <form className="border p-6 border-gray-300 rounded-lg w-[300px] bg-white" onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-2 gap-1">
                        <label className="font-medium">Email</label>
                        <input onChange={handleEmail} value={useremail} className="appearance-none border border-gray-300 rounded-md p-1" required />
                    </div>
                    <div className="flex flex-col mb-2 gap-1">
                        <label className="font-medium">Password</label>
                        <input type="password" onChange={handlePassword} value={userpassword} className="appearance-none border border-gray-300 rounded-md p-1" required />
                    </div>
                    <div className="text-xs text-right text-red-800 underline cursor-pointer hover:text-red-900"
                        onClick={() => setIsForgotPasswordPopup(true)}
                    >Forgot Password</div>
                    <button className="bg-red-900 w-full py-2 rounded-md text-white font-medium mt-4 cursor-pointer hover:bg-red-800">Login</button>
                </form>
            </div>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <ForgotPassword open={isForgotPasswordPopup} onClose={setIsForgotPasswordPopup} />
        </>
    )
};

export default Login;