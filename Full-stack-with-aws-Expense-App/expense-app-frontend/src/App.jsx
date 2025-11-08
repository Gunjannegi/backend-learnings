import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import ProtectedRoute from "./components/Basic/ProtectedRoute"


function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
