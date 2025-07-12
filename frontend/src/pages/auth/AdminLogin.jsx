import React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Shield, ArrowLeft } from "lucide-react"

export default function AdminLogin() {
  const [adminForm, setAdminForm] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAdminForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAdminLogin = () => {
    console.log("Admin login clicked", adminForm)
    // Add admin login logic here
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Admin Access</h2>
          <p className="text-gray-300">Administrative login portal</p>
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter admin password"
            />
          </div>

          <div className="flex items-center justify-between">
            <Link to="/forgot-password" className="text-sm text-red-400 hover:text-red-300 hover:underline">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            Admin Login
          </button>
        </form>

        <div className="space-y-4">
          <Link
            to="/login"
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to User Login
          </Link>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400">Restricted access for authorized personnel only.</p>
        </div>
      </div>
    </div>
  )
}