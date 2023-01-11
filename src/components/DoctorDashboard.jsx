import React from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";

export default function DoctorDashboard(props) {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item active>Inicio</Breadcrumb.Item>
      </Breadcrumb>
      <Container data-cy="doctor-dashboard">
        <Row>
          <Col>
            <h1>YATA-HTA Inicio</h1>
            <p>
              Bienvenid@ al sitio web de gestión de los pacientes del centro de
              salud "Los Yébenes"
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={5}>ESTADÍSTICAS</Col>
          <Col sm={7}>TABLA</Col>
        </Row>
      </Container>
    </>
  );
}
