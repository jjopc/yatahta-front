import React, { useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Layout from "./../../../components/ui/Layout";
import { getPatientInfo, selectPatientInfo } from "../state/doctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../auth/state/authSlice";
import { getUser, isStaff } from "../../auth/services/authService";
import addPatientImg from "../../../../assets/addpatient.png";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Table,
  Button,
  Form,
  ButtonGroup,
  Modal,
} from "react-bootstrap";

function PatientProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const patient = useSelector(selectPatientInfo);

  if (!isLoggedIn || !isStaff()) {
    return <Navigate to={"/"} />;
  }

  if (!patient) {
    return <div>Cargando...</div>;
  }

  let birthday = new Date(patient.birthday).toLocaleDateString("es", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Layout>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item href="/#/patients">Pacientes</Breadcrumb.Item>
        <Breadcrumb.Item active>{patient.username}</Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <h2>Información personal</h2>
        <Row>
          <Col>
            <h4>
              <strong>{patient.username}</strong>
            </h4>
          </Col>
          <Col xs="auto">
            <ButtonGroup>
              <Button id="info" size="sm" variant="outline-primary">
                Mensajes
              </Button>
              <Button id="drugs" size="sm" variant="outline-primary">
                Medicación
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Fecha de nacimiento: {birthday}</p>
            <p>Puntos: {patient.points}</p>
          </Col>
        </Row>
        <Row>
          <Col as={"h3"}>Gráfico de tensiones del paciente</Col>
        </Row>
        <Row>
          <Col>GRÁFICO</Col>
        </Row>
        <Row>
          <Col as={"h3"}>Tabla de tomas de tensión</Col>
        </Row>
        <Row>
          <Col>
            <Table striped hover bordered responsive="sm">
              <thead>
                {/* TODO: Posibilidad de implementar ordenación de la tabla al pulsar un header */}
                <tr>
                  <th>Fecha</th>
                  <th>Sistólica</th>
                  <th>Diastólica</th>
                  <th>puls/min</th>
                  <th>Braso de la toma</th>
                </tr>
              </thead>
              <tbody>
                {patient.pressurelist.map((pressure, index) => {
                  let date = new Date(pressure.date).toLocaleDateString("es", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  let arm = pressure.arm === "LT" ? "Izquierdo" : "Derecho";
                  return (
                    <tr key={pressure.id}>
                      <td>{date}</td>
                      <td>{pressure.systolic}</td>
                      <td>{pressure.diastolic}</td>
                      <td>{pressure.bpm}</td>
                      <td>{arm}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default PatientProfile;
