import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isToken = !!localStorage.getItem("token");

  if (!isToken) {
    // 🚫 Not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow access
  return children;
};

export default ProtectedRoute;
