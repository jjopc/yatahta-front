import Layout from "./components/ui/Layout";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import axios from "axios";

import "./App.css";

function App() {
  // Implementar la lógica de comprobación de user logueado:
  // si está logueado muestra página de inicio, sino muestra acceso a login o registro
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return window.localStorage.getItem("yatahta.auth") !== null;
  });

  // const logIn = (username, password) => setIsLoggedIn(true);

  const logIn = async (username, password) => {
    const url = "http://localhost:8000/auth/login/";
    try {
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem(
        "yatahta.auth",
        JSON.stringify(response.data)
      );
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Layout isLoggedIn={isLoggedIn} />} />
      <Route path="/sign-up" element={<SignUp isLoggedIn={isLoggedIn}/>} />
      <Route
        path="/log-in"
        element={<LogIn logIn={logIn} isLoggedIn={isLoggedIn} />}
      />
    </Routes>
  );
}

export default App;
