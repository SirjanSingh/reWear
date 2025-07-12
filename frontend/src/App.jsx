import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/auth/LoginPage"
import SignUp from "./pages/auth/SignUp"
import AdminLogin from "./pages/auth/AdminLogin"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import Home from "./pages/Home/Home"
import ListItem from "./pages/Items/ListItem"
import BrowseItems from "./pages/Items/BrowseItems"
import StartSwapping from "./pages/Items/StartSwapping"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/list-item" element={<ListItem />} />
        <Route path="/browse-items" element={<BrowseItems />} />
        <Route path="/start-swapping" element={<StartSwapping />} />
      </Routes>
    </Router>
  )
}