import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toastErrorNotify } from "../helper/ToastNotify";
import GoogleIcon from "../assets/GoogleIcon";

const Login = () => {
    const { signIn, signUpWithGoogle } = useAuth();
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/chat"); //direct to chat after sign in
    } catch (error) {
      toastErrorNotify(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signUpWithGoogle();
      navigate("/chat"); //direct to chat after sign in
    } catch (error) {
      toastErrorNotify(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 w-[380px] h-[500px] p-8 rounded-xl shadow-2xl card-shadow animate-pulseRGB">
        <h2 className="text-red-500 text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative z-0 w-full mb-4">
            <input
              type="email"
              placeholder="Email"
              className="peer w-full p-3 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative z-0 w-full mb-6">
            <input
              type="password"
              placeholder="Password"
              className="peer w-full p-3 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Continue with Google
            <GoogleIcon className="ml-2" />
          </button>

          {/* Link to Register */}
          <div className="text-center mt-4">
            <Link to="/register" className="text-blue-500 hover:text-blue-600">
              Don&apos;t have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

