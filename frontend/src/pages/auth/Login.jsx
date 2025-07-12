import { useState } from "react"
import { Eye, EyeOff, User, Shield, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("user") // "user" or "admin"
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log to console (replace with actual API logic)
    console.log("Login Submission:", {
      role: activeTab,
      email: formData.email,
      password: formData.password,
      timestamp: new Date().toISOString(),
    })

    setIsSubmitting(false)

    // Reset form after successful submission
    setFormData({ email: "", password: "" })
    alert(`${activeTab === "user" ? "User" : "Admin"} login successful!`)
  }

  const switchTab = (tab) => {
    setActiveTab(tab)
    setErrors({})
    setFormData({ email: "", password: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl p-8 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-gray-900/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                {activeTab === "user" ? (
                  <User className="h-8 w-8 text-white" />
                ) : (
                  <Shield className="h-8 w-8 text-white" />
                )}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to ReWear</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {activeTab === "user" ? "Sign in to your account" : "Access admin dashboard"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-8 transition-colors duration-300">
            <button
              onClick={() => switchTab("user")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "user"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <User className="h-4 w-4" />
              User Login
            </button>
            <button
              onClick={() => switchTab("admin")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "admin"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Shield className="h-4 w-4" />
              Admin Login
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {activeTab === "admin" ? "Admin Email" : "Email Address"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                  placeholder={activeTab === "admin" ? "admin@rewear.com" : "you@example.com"}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-fade-in">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-fade-in">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:scale-[1.02] active:scale-[0.98] ${
                activeTab === "user"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl"
                  : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:ring-purple-500 shadow-lg hover:shadow-xl"
              } ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                `Sign in as ${activeTab === "user" ? "User" : "Admin"}`
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-3">
            <a
              href="#"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Forgot your password?
            </a>
            {activeTab === "user" && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  Sign up for free
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 ReWear. Sustainable fashion for everyone.</p>
        </div>
      </div>
    </div>
  )
}
