import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (!isLoggedIn) {
    // 🚫 Not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow access
  return children;
};

export default ProtectedRoute;
