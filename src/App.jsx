import Layout from "./components/ui/Layout";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

import "./App.css";

function App() {
  // Implementar la lógica de comprobación de user logueado:
  // si está logueado muestra página de inicio, sino muestra acceso a login o registro
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logIn = (username, password) => setIsLoggedIn(true);

  return (
    <Routes>
      <Route path="/" element={<Layout isLoggedIn={isLoggedIn} />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/log-in" element={<LogIn logIn={logIn} />} />
    </Routes>
  );
}

export default App;
