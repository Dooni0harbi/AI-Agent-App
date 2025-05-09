import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ChatInterface from "../components/chat/ChatInterface";
import TranscriptionComponent from "../components/transcription/TranscriptionViewer";
import APIKeyManager from "../components/profile/APIKeyManager";
import MainLayout from "../components/shared/MainLayout";
import { useApp } from "../context/AppContext";
import Animation from "../assets/Animation.json";
import Lottie from "lottie-react";
import robot from "../assets/Robot.png";

const Home = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("chat");
  const { transcriptions } = useApp();

  useEffect(() => {
    if (loading) return;
    if (currentUser) {
      setActiveTab("chat");
      navigate("/chat");
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
         <img 
        src={robot} 
        alt="AI Agent Logo" 
        className="w-40 h-auto mb-6"  
      />
  
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Welcome to Smarty Pants AI
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
          Sign in or register to start chatting with your AI assistant!
        </p>

        <div className="flex space-x-6">
          <Link
            to="/login"
            className="p-6 w-40 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg transition duration-300 hover:scale-105 shadow-cyan-500/50 dark:shadow-cyan-400/40"
          >
            <span className="block text-lg font-semibold text-gray-800 dark:text-white">
              Sign In
            </span>
          </Link>

          <Link
            to="/register"
            className="p-6 w-40 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg transition duration-300 hover:scale-105 shadow-fuchsia-500/50 dark:shadow-fuchsia-400/40"
          >
            <span className="block text-lg font-semibold text-gray-800 dark:text-white">
              Register
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <MainLayout>
        <div className="w-full max-w-3xl">
          {/* Lottie Animation */}
          <div className="flex justify-center mb-6">
           <div className="w-48 h-48">
             <Lottie animationData={Animation} loop={true} />
                  </div>
                 </div>
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Welcome to Smarty Pants AI Chatbot Page
          </h1>

          {/* Tab Navigation */}
          <div className="mb-4 flex justify-center space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "chat"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("chat")}
            >
              Chat
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "transcription"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("transcription")}
            >
              Transcription
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "profile"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner">
            {activeTab === "chat" && <ChatInterface />}
            {activeTab === "transcription" && <TranscriptionComponent />}
            {activeTab === "profile" && <APIKeyManager />}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Home;
