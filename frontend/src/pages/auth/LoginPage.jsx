"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Shield } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()

  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [adminForm, setAdminForm] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleUserInputChange = (e) => {
    const { name, value } = e.target
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target
    setAdminForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateAccount = () => {
    navigate("/signup")
  }

  const handleUserLogin = () => {
    console.log("User login clicked", userForm)
    // Add user login logic here
  }

  const handleAdminLogin = () => {
    console.log("Admin login clicked", adminForm)
    // Add admin login logic here
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - User Login */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Login as User</h2>
            <p className="text-gray-600">Access your personal account</p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              handleUserLogin()
            }}
          >
            <div>
              <label htmlFor="user-username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="user-username"
                name="username"
                type="text"
                required
                value={userForm.username}
                onChange={handleUserInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="user-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="user-email"
                name="email"
                type="email"
                required
                value={userForm.email}
                onChange={handleUserInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="user-password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="user-password"
                name="password"
                type="password"
                required
                value={userForm.password}
                onChange={handleUserInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Login
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCreateAccount}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Create Account
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">New to our platform? Create an account to get started.</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px bg-gray-200"></div>

      {/* Right Panel - Admin Login */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Login as Admin</h2>
            <p className="text-gray-300">Administrative access only</p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              handleAdminLogin()
            }}
          >
            <div>
              <label htmlFor="admin-username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                id="admin-username"
                name="username"
                type="text"
                required
                value={adminForm.username}
                onChange={handleAdminInputChange}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter admin username"
              />
            </div>

            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                required
                value={adminForm.email}
                onChange={handleAdminInputChange}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter admin email"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                required
                value={adminForm.password}
                onChange={handleAdminInputChange}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              Admin Login
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400">Restricted access for authorized personnel only.</p>
          </div>
        </div>
      </div>

      {/* Mobile Divider */}
      <div className="lg:hidden w-full h-px bg-gray-200 absolute top-1/2 transform -translate-y-1/2"></div>
    </div>
  )
}
