import { useState } from "react";

import { Button } from "@albert-ambaryan/ui/button";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

const API_URL = "http://localhost:3333/api/auth/";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("aa-token")
  );

  const handleLogout = () => {
    localStorage.removeItem("aa-token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav>
        {isLoggedIn ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <LoginPage onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route
          path="register"
          element={isLoggedIn ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <h1>Welcome to the app!. You are logged in.</h1>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
