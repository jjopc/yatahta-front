import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Breadcrumb, Card, Button, Form } from "react-bootstrap";
import Header from "./ui/containers/Header";
import { Formik } from "formik";

export default function LogIn(props) {
  const [isSubmitted, setSubmitted] = useState(false);

  if (isSubmitted) {
    return <Navigate to="/" />;
  }

  const onSubmit = (values, actions) => {
    props.logIn(values.username, values.password);
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Log in</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="shadow" style={{ margin: "auto", width: "50%" }}>
        <Card.Header as="h5">Log in</Card.Header>
        <Card.Body>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={onSubmit}
          >
            {({ handleChange, handleSubmit, values }) => (
              <Form noValidate>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Nombre de usuario:</Form.Label>
                  <Form.Control
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                  />
                </Form.Group>
                <div className="d-grid mb-3">
                  <Button type="submit" variant="primary" onClick={handleSubmit}>
                    Log in
                  </Button>
                </div>
              </Form>
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
