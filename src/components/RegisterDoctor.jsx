import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Breadcrumb,
  Card,
  Button,
  Form,
  Container,
  Alert,
  InputGroup,
} from "react-bootstrap";
import Header from "./ui/containers/Header";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerDoctorReducer } from "../state/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function RegisterDoctor() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleRegisterDoctor = async (
    { username, email, password1, password2 },
    actions
  ) => {
    try {
      const response = await dispatch(
        registerDoctorReducer(username, email, password1, password2)
      );
      setIsSubmitted(true);
      return response;
    } catch (error) {
      console.log(error);
      const data = error.response.data;
      console.log(data);
      for (const key in data) {
        console.log(data[key]);
        actions.setFieldError(key, data[key]);
      }
    }
  };

  if (!isLoggedIn || isSubmitted) {
    return <Navigate to="/" />;
  }

  const registerDoctorSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "¡Nombre de usuario demasiado corto!")
      .max(150, "¡Nombre de usuario demasiado largo!")
      .required("Campo obligatorio"),
    email: Yup.string()
      .email("Dirección de correo electrónico incorrecta.")
      .required("Campo obligatorio"),
    password1: Yup.string()
      .min(8, "¡Contraseña demasiado corta!")
      .max(50, "¡Contraseña demasiado larga!")
      .required("Campo obligatorio"),
    password2: Yup.string()
      .oneOf([Yup.ref("password1"), null], "Las contraseñas deben coincidir.")
      .required("Campo obligatorio"),
  });

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
            validationSchema={registerDoctorSchema}
            onSubmit={handleRegisterDoctor}
          >
            {({
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              isValid,
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
                      /* Una forma de mostrar feedback positivo */
                      // isValid={touched.username && !errors.username}
                      required
                    />
                    {/* Una forma de mostrar feedback positivo */}
                    {/* <Form.Control.Feedback>
                      ¡Parece correcto!
                    </Form.Control.Feedback> */}
                    {/* Una forma de mostrar errores */}
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Correo electrónico:</Form.Label>
                    <Form.Control
                      className={
                        touched.email && errors.email ? "is-invalid" : ""
                      }
                      name="email"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      required
                    />
                    {/* Otra forma de mostrar errores */}
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password1">
                    <Form.Label>Contraseña:</Form.Label>
                    <InputGroup>
                      <Form.Control
                        className={
                          touched.password1 && errors.password1
                            ? "is-invalid"
                            : ""
                        }
                        name="password1"
                        type={showPassword1 ? "text" : "password"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password1}
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        id="btnShowPassword1"
                        className="input-group-append"
                        onClick={() => setShowPassword1(!showPassword1)}
                      >
                        {showPassword1 ? "Ocultar" : "Mostrar"}
                      </Button>
                      <ErrorMessage
                        name="password1"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Repita la contraseña:</Form.Label>
                    <InputGroup>
                      <Form.Control
                        className={
                          touched.password2 && errors.password2
                            ? "is-invalid"
                            : ""
                        }
                        name="password2"
                        type={showPassword2 ? "text" : "password"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password2}
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        id="btnShowPassword2"
                        className="input-group-append"
                        onClick={() => setShowPassword2(!showPassword2)}
                      >
                        {showPassword2 ? "Ocultar" : "Mostrar"}
                      </Button>
                      <ErrorMessage
                        name="password2"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
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
