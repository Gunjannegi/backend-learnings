import { useState } from "react";

const Login = () => {
    const [useremail, setUserEmail] = useState();
    const [username, setUserName] = useState();
    const [userpassword, setUserPassword] = useState();

    const handleName = (e) => {
        setUserName(e.target.value)
    };

    const handleEmail = (e) => {
        setUserEmail(e.target.value)
    };

    const handlePassword = (e) => {
        setUserPassword(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = {
            username: username,
            useremail: useremail,
            userpassword: userpassword
        }
        try {
            const response = await fetch(`http://localhost:3000/user/signup`, {
                method: "POST",
                body: JSON.stringify(userInfo)
            })
            if (response.ok) {

            }
        } catch (err) {

        }

    }
    return (
        <div className="min-h-[90vh] w-full flex justify-center items-center m-0">
            <form className="border p-6 border-gray-300 rounded-lg w-[300px]" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-2 gap-1">
                    <label className="font-medium">Full Name</label>
                    <input onChange={handleName} value={username} className="appearance-none border border-gray-300 rounded-md p-1" required />
                </div>
                <div className="flex flex-col mb-2 gap-1">
                    <label className="font-medium">Email</label>
                    <input onChange={handleEmail} value={useremail} className="appearance-none border border-gray-300 rounded-md p-1" required />
                </div>
                <div className="flex flex-col mb-2 gap-1">
                    <label className="font-medium">Password</label>
                    <input onChange={handlePassword} value={userpassword} className="appearance-none border border-gray-300 rounded-md p-1" required />
                </div>
                <button className="bg-red-900 w-full py-2 rounded-md text-white font-medium mt-4 cursor-pointer hover:bg-red-800">Sign Up</button>
                <p className="text-xs text-center mt-1">Existing User?<span className="text-red-800 underline cursor-pointer hover:text-red-900">Login</span></p>
            </form>
        </div>
    )
};

export default Login;