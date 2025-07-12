import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/auth/LoginPage"
import SignupPage from "./pages/auth/SignupPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import AdminLogin from "./pages/auth/AdminLogin"
import UserLogin from "./pages/auth/UserLogin"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  )
}

export default App