import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Breadcrumb,
  Card,
  Button,
  Form,
  Container,
  Alert,
} from "react-bootstrap";
import Header from "./ui/containers/Header";
import { Formik } from "formik";
import axios from "axios";

// TODO: Refactor porque no necesito un SignUp...sino un registro de médicos
// Me he equivocado, pero me sirve de base, tengo que cambiar el nombre del componente
export default function SignUp({ isLoggedIn }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onSubmit = async (username, email, password1, password2) => {
    const url = "http://localhost:8000/api/users/add_doctor/";
    try {
      const response = await axios.post(url, {
        username,
        email,
        password1,
        password2,
      });
      setIsSubmitted(true);
      return { response, isError: false };
    } catch (error) {
      console.log(error);
      return { response: error, isError: true };
    }
  };

  if (isSubmitted) {
    return <Navigate to="/log-in" />;
  }

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Sign up</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="shadow" style={{ margin: "auto", width: "50%" }}>
        <Card.Header>
          <Container
            fluid
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="src/assets/stethoscope.svg"
              alt="Logo de YATA HTA"
              width={50}
              height={50}
            />
            <h1>YATA HTA</h1>
          </Container>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password1: "",
              password2: "",
            }}
            onSubmit={onSubmit}
          >
            {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
              <>
                {/* TODO: Mostrar errores en campos concretos */}
                {"__all__" in errors && (
                  <Alert variant="danger">{errors.__all__}</Alert>
                )}
                <Form noValidate>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Nombre de usuario:</Form.Label>
                    <Form.Control
                      name="username"
                      onChange={handleChange}
                      value={values.username}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Correo electrónico:</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={values.email}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password1">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                      name="password1"
                      type="password"
                      onChange={handleChange}
                      value={values.password1}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Repita la contraseña:</Form.Label>
                    <Form.Control
                      name="password2"
                      type="password"
                      onChange={handleChange}
                      value={values.password2}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid mb-3">
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="primary"
                      onClick={handleSubmit}
                    >
                      Registrarme
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
          <Card.Text>
            ¿Tienes ya una cuenta? <Link to="/log-in">Log in</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
