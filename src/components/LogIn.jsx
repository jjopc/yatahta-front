import React from "react";
import { Link } from "react-router-dom";

export default function LogIn(props) {
  return (
    <>
      <Link to="/">Inicio</Link>
      <h1>Log In</h1>
      <p>
        ¿Aún no te has registrado? <Link to="/sign-up">¡Regístrate!</Link>
      </p>
    </>
  );
}