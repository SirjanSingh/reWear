import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/auth/LoginPage"
import SignUp from "./pages/auth/SignUp"
import AdminLogin from "./pages/auth/AdminLogin"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  )
}