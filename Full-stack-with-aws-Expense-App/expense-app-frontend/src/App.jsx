import { Route, Routes, useNavigate } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import ProtectedRoute from "./components/Basic/ProtectedRoute"
import PaymentStatus from "./components/PaymentStatus"
import Reports from "./components/ui/Reports/Reports"
import ProtectedLayout from "./components/Basic/ProtectedLayout"
import Home from "./components/Home"


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/reports" element={
            <ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="payment-status/:orderId" element={
            <ProtectedRoute><PaymentStatus /></ProtectedRoute>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
