import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth";

const PaymentStatus = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { setUserInfo } = useAuth();
  const [status, setStatus] = useState("loading");
  // loading | success | failed

  useEffect(() => {
    const verifyPayment = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      try {
        const res = await fetch("http://localhost:3000/payment/verify", {
          method: "POST",
          headers: {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        });

        const data = await res.json();

        if (data.success) {
          setStatus("success");
          const premiumUserInfo = { ...userInfo, isPremium: true }
          localStorage.setItem("userInfo", JSON.stringify(premiumUserInfo));
          setUserInfo(premiumUserInfo);
          setTimeout(() => navigate("/dashboard"), 10000);
        } else if (data.status === "PENDING") {
          setStatus("pending");
        }
        else {
          setStatus("failed");
        }
      } catch (err) {
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [orderId, navigate]);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontFamily: "Arial"
    }}>

      {status === "loading" && (
        <>
          <h2>Verifying Payment...</h2>
          <p>Please wait while we confirm your payment.</p>
        </>
      )}

      {status === "success" && (
        <>
          <h2 className="text-green-500">🎉 Payment Successful!</h2>
          <p>You are now a Premium user. Redirecting...</p>
        </>
      )}
      {status === "pending" && (
        <>
          <h2 className="text-yellow-500">⏳ Payment Pending</h2>
          <p>We are waiting for confirmation from the bank.</p>
          <p>Please do not refresh this page.</p>
        </>
      )}

      {status === "failed" && (
        <>
          <h2 className="text-red-500">❌ Payment Failed</h2>
          <p>Something went wrong. Please try again.</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-red-900 hover:bg-red-800 cursor-pointer text-white px-3 py-2.5 rounded-md mt-5 border-0"
          >
            Go to Dashboard
          </button>
        </>
      )}

    </div>
  );
};

export default PaymentStatus;
