import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider, useAuth } from "./context/AuthContext";
import { AppContextProvider } from "./context/AppContext";
import { AudioProvider } from "./context/AudioContext";
import AppRouter from "./router/AppRouter";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import TopNavBar from "./components/navbar/TopNavBar.jsx";
import { OpenAIProvider, useOpenAI } from "./services/openai"; 

function OpenAIInitializer() {
  const { initialize } = useOpenAI();
  useEffect(() => {
    const storedApiKey = localStorage.getItem("openai_api_key");
    if (storedApiKey) {
      initialize(storedApiKey);
    }
  }, []);
  return null;
}

// Move AppShell out so it can use useAuth
function AppShell() {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      {currentUser && <TopNavBar />}
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeButton={true}
        rtl={false}
        pauseOnFocusLoss={false}
        closeOnClick
        toastClassName="bg-gray-800 text-white text-sm rounded-lg shadow-lg"
        bodyClassName="text-lg font-medium"
        progressClassName="bg-blue-500"
      />
    </BrowserRouter>
  );
}

function App() {
  return (
    <div className="dark:bg-gray-dark-main">
      <AuthContextProvider>
        <AppContextProvider>
          <AudioProvider>
            <OpenAIProvider>
              <OpenAIInitializer />
              <AppShell />
            </OpenAIProvider>
          </AudioProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;

