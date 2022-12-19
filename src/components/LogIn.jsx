import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Card, Container } from "react-bootstrap";
import Header from "./ui/containers/Header";

export default function LogIn(props) {
  return (
    <>
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Log in</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="middle-center">
        <Card.Header>Log in</Card.Header>
        <Card.Body>
          <Card.Text>
            ¿Aún no te has registrado? <Link to="/sign-up">¡Regístrate!</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
