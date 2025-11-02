import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Signup from "./components/Signup"
import Login from "./components/Login"


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
