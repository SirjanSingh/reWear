import React from "react"
import { User, Shield } from "lucide-react"

export default function LoginPage() {
  const handleCreateAccount = () => {
    // Navigate to signup page
    console.log("Create account clicked")
    // In a real app, you would use: navigate("/signup")
  }

  const handleUserLogin = () => {
    // Add user login logic here
    console.log("User login clicked")
  }

  const handleAdminLogin = () => {
    // Add admin login logic here
    console.log("Admin login clicked")
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

          <div className="space-y-4">
            <button
              onClick={handleUserLogin}
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
              onClick={handleCreateAccount}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Create Account
            </button>
          </div>

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

          <div className="space-y-4">
            <button
              onClick={handleAdminLogin}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              Admin Login
            </button>
          </div>

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