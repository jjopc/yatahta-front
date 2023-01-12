import Layout from "./components/ui/Layout";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import axios from "axios";

import "./App.css";
import DoctorPatients from "./components/DoctorPatients";
import Home from "./components/Home";

function App() {
  // Implementar la lógica de comprobación de user logueado:
  // si está logueado muestra página de inicio, sino muestra acceso a login o registro
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return window.localStorage.getItem("yatahta.auth") !== null;
  });

  // const logIn = (username, password) => setIsLoggedIn(true);

  const logIn = async (username, password) => {
    const url = `${import.meta.env.VITE_AUTH_URL}/login/`;
    try {
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem(
        "yatahta.auth",
        JSON.stringify(response.data)
      );
      setIsLoggedIn(true);
      return { response, isError: false };
    } catch (error) {
      console.log(error);
      return { response: error, isError: true };
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("yatahta.auth");
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Home isLoggedIn={isLoggedIn} logOut={logOut} />}
      />
      <Route path="/sign-up" element={<SignUp isLoggedIn={isLoggedIn} />} />
      <Route
        path="/log-in"
        element={<LogIn logIn={logIn} isLoggedIn={isLoggedIn} />}
      />
      <Route path="/patients" element={<DoctorPatients />} />
    </Routes>
  );
}

export default App;
