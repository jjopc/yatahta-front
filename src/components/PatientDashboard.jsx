import React from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";

export default function PatientDashboard() {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item active>Inicio</Breadcrumb.Item>
      </Breadcrumb>
      <Container data-cy="patient-dashboard">
        <Row>
          <Col>
            <h1>Dashboard de pacientes</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}
