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

export default function LogIn({ isLoggedIn, logIn }) {
  const [isSubmitted, setSubmitted] = useState(false);

  if (isLoggedIn || isSubmitted) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (values, actions) => {
    try {
      const { response, isError } = await logIn(
        values.username,
        values.password
      );
      if (isError) {
        const data = response.response.data;
        console.log(data);
        for (const value in data) {
          console.log(value);
          actions.setFieldError(value, data[value].join(" "));
        }
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Log in</Breadcrumb.Item>
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
              password: "",
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
                      className={"username" in errors ? "is-invalid" : ""}
                      name="username"
                      onChange={handleChange}
                      value={values.username}
                      required
                    />
                    {"username" in errors && (
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                      className={"password" in errors ? "is-invalid" : ""}
                      name="password"
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                    />
                    {"password" in errors && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <div className="d-grid mb-3">
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="primary"
                      onClick={handleSubmit}
                    >
                      Log in
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
          <Card.Text className="text-center">
            ¿Aún no te has registrado? <Link to="/sign-up">¡Regístrate!</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
