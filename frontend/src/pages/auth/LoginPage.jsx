import { useState } from "react"
import { Eye, EyeOff, User, Shield, Mail, Lock } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

export default function LoginPage() {
  // get “role” from the URL, default to “user”
  const { role } = useParams()
  const activeTab = role === "admin" ? "admin" : "user"

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

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
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))

    console.log("Login Submission:", {
      role: activeTab,
      email: formData.email,
      password: formData.password,
      timestamp: new Date().toISOString(),
    })

    setIsSubmitting(false)
    setFormData({ email: "", password: "" })
    alert(`${activeTab === "user" ? "User" : "Admin"} login successful!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to ReWear
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {activeTab === "user" ? "Sign in to your account" : "Access admin dashboard"}
            </p>
          </div>

          {/* Role Switcher Buttons */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-8">
            <button
              onClick={() => navigate("/login/user")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition ${
                activeTab === "user"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <User className="h-4 w-4" />
              User Login
            </button>
            <button
              onClick={() => navigate("/login/admin")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition ${
                activeTab === "admin"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Shield className="h-4 w-4" />
              Admin Login
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {activeTab === "admin" ? "Admin Email" : "Email Address"}
              </label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={activeTab === "admin" ? "admin@rewear.com" : "you@example.com"}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] ${
                activeTab === "user"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 focus:ring-blue-500"
                  : "bg-gradient-to-r from-purple-500 to-purple-600 focus:ring-purple-500"
              } ${isSubmitting ? "opacity-75 cursor-not-allowed" : "shadow-lg hover:shadow-xl"}`}
            >
              {isSubmitting
                ? "Signing in..."
                : `Sign in as ${activeTab === "user" ? "User" : "Admin"}`}
            </button>
          </form>

          {/* Links */}
          <div className="mt-8 text-center space-y-3">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot your password?
            </button>
            {activeTab === "user" && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Sign up for free
                </button>
              </p>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          © 2024 ReWear. Sustainable fashion for everyone.
        </p>
      </div>
    </div>
  )
}
