import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Layout from "./../../../components/ui/Layout";
import { getPatients, selectPatientsList } from "../state/doctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../auth/state/authSlice";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Table,
  Button,
  Form,
  ButtonGroup,
} from "react-bootstrap";

export default function DoctorPatients() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  const patients = useSelector(selectPatientsList);

  if (!isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  const orderedPatients = patients.slice().sort((a, b) => a.points < b.points);
  let filteredPatients = orderedPatients;
  if (searchText !== "") {
    filteredPatients = orderedPatients.filter((patient) => {
      return (
        patient.username.toLowerCase().indexOf(searchText) > -1 ||
        patient.patient_code.toLowerCase().indexOf(searchText) > -1 ||
        patient.id.toString().indexOf(searchText) > -1
      );
    });
  }

  return (
    <Layout>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Pacientes</Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <h2>Tus pacientes</h2>
        <Row>
          <Col>
            Introduzca el nombre, ID o código de un usuario para buscarlo
          </Col>
          <Col xs="auto">
            {/* TODO: Dirigir a /add-patient */}
            <Button onClick={() => navigate("/")}>Añadir paciente</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              name="search-text"
              placeholder="Buscar"
              id="search-text"
              className="mt-3 mb-3"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped hover bordered responsive="sm">
              <thead>
                {/* TODO: Posibilidad de implementar ordenación de la tabla al pulsar un header */}
                <tr>
                  <th>ID Paciente</th>
                  <th>Código Paciente</th>
                  <th>Nombre de usuario</th>
                  <th>Fecha de nacimiento</th>
                  <th>Puntuación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((user, index) => {
                  let date = new Date(user.birthday).toLocaleDateString("es", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.patient_code}</td>
                      <td>{user.username}</td>
                      <td>{date}</td>
                      <td>{user.points}</td>
                      <td>
                        <ButtonGroup>
                          {/* TODO: Implementar estas acciones */}
                          <Button id="info" size="sm" variant="outline-primary">
                            Información
                          </Button>
                          <Button
                            id="drugs"
                            size="sm"
                            variant="outline-primary"
                          >
                            Medicación
                          </Button>
                          <Button
                            id="messages"
                            size="sm"
                            variant="outline-primary"
                          >
                            Mensajes
                          </Button>
                        </ButtonGroup>
                      </td>
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
