import { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [3000, onClose]);

    const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
    return (
        <div
            className={`fixed bottom-5 right-5 ${bgColor} text-white px-4 py-2 rounded shadow-lg`}
        >
            {message}
        </div>
    )
};

export default Toast;