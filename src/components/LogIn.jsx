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
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

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
        for (const key in data) {
          console.log(data[key]);
          actions.setFieldError(key, data[key]);
        }
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logInSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "¡Nombre de usuario demasiado corto!")
      .max(150, "¡Nombre de usuario demasiado largo!")
      .required("Campo obligatorio"),
    password: Yup.string()
      .min(8, "¡Contraseña demasiado corta!")
      .max(50, "¡Contraseña demasiado larga!")
      .required("Campo obligatorio"),
  });

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
            validationSchema={logInSchema}
            onSubmit={onSubmit}
          >
            {({
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting,
              values,
            }) => (
              <>
                {"detail" in errors && (
                  <Alert variant="danger">{errors.detail}</Alert>
                )}
                <Form noValidate>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Nombre de usuario:</Form.Label>
                    <Form.Control
                      className={
                        touched.username && errors.username ? "is-invalid" : ""
                      }
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      required
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                      className={
                        touched.password && errors.password ? "is-invalid" : ""
                      }
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      value={values.password}
                      required
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
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
