import React from "react";
import { Link } from "react-router-dom";

export default function SignUp(props) {
  return (
    <>
      <Link to="/">Inicio</Link>
      <h1>Registro</h1>
      <p>
        ¿Tienes ya una cuenta? <Link to="/log-in">Log In</Link>
      </p>
    </>
  );
}