import { useEffect, useState } from "react";

import { decodeEmailFromJWT } from "@albert-ambaryan/helpers";
import { Button } from "@albert-ambaryan/ui/button";
import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/main-layout";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

export function App() {
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("aa-token");
    if (token) {
      const { email } = decodeEmailFromJWT(token);
      setUserEmail(email);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aa-token");
    setIsLoggedIn(false);
    setUserEmail("");
  };

  const handleLogin = (token?: string) => {
    if (!token) return;
    localStorage.setItem("aa-token", token);
    setIsLoggedIn(true);
    const { email } = decodeEmailFromJWT(token);
    setUserEmail(email);
  };

  return (
    <MainLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="register"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <RegisterPage onRegister={handleLogin} />
            )
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <div className="text-center">
                <h1 className="flex flex-col items-center gap-1 text-3xl font-bold text-gray-800">
                  <span>Welcome to the app!</span>
                </h1>
                <p className="mt-4 font-mono text-gray-600">{userEmail}</p>
                <p>You are logged in</p>
                <Button
                  size="lg"
                  className="mt-8 bg-gradient-to-r from-purple-800 to-pink-500"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
