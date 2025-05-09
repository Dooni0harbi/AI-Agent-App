import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import GoogleIcon from "../assets/GoogleIcon";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";


const Register = () => {
//   const { createUser, signUpProvider } = useContext(AuthContext);

  const { signUpWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password, firstName, lastName);
      toastSuccessNotify("Registration successful");

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      toastErrorNotify("Registration failed", err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 w-[380px] h-[580px] p-8 rounded-xl shadow-2xl card-shadow animate-pulseRGB">
        <h2 className="text-red-500 text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>
        <form onSubmit={handleRegister}>
          <div className="relative z-0 w-full mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="peer w-full p-3 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="relative z-0 w-full mb-4">
            <input
              type="text"
              placeholder="Last Name"
              className="peer w-full p-3 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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

          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
          >
            Register
          </button>

          <button
            type="button"
            onClick={() => signUpWithGoogle()}
            className="w-full flex items-center justify-center py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Continue with Google
            <GoogleIcon className="ml-2" />
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

