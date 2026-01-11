import { Route, Routes, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import ProtectedRoute from "./components/Basic/ProtectedRoute"
import PaymentStatus from "./components/PaymentStatus"
import { useEffect } from "react"
import { useAuth } from "./components/context/auth"
import Reports from "./components/ui/Reports/Reports"


function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/dashboard');
  //   }
  // }, [isAuthenticated])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/reports" element={
          <ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="payment-status/:orderId" element={
          <ProtectedRoute><PaymentStatus /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
