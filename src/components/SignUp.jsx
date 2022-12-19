import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Card, Container } from "react-bootstrap";
import Header from "./ui/containers/Header";

export default function SignUp(props) {
  return (
    <>
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Sign up</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="middle-center">
        <Card.Header>Registro</Card.Header>
        <Card.Body>
          <Card.Text>
            ¿Tienes ya una cuenta? <Link to="/log-in">Log in</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
