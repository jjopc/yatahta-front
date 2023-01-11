import React, { useEffect, useState } from "react";
import { Container, Row, Col, Breadcrumb, Table } from "react-bootstrap";
import {
  getGeneralStatistics,
  getUsersClassification,
} from "../services/StatisticsService";

export default function DoctorDashboard(props) {
  const [statistics, setStatistics] = useState({});
  const [usersClassification, setUsersClassification] = useState([]);

  useEffect(() => {
    const loadStatistics = async () => {
      const { response, isError } = await getGeneralStatistics();
      if (!isError) {
        setStatistics(response.data);
      } else {
        setStatistics({});
      }
    };

    const loadUsersClassification = async () => {
      const { response, isError } = await getUsersClassification();
      if (!isError) {
        setUsersClassification(response.data.results);
      } else {
        setUsersClassification([]);
      }
    };

    loadStatistics();
    loadUsersClassification();
  }, []);

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
          <Col sm={5}>
            <h3>Información general</h3>
            <p>Las estadísticas generales actuales son las siguientes:</p>
            <ul>
              <li>
                <strong>Número de usuarios: </strong>
                {statistics.num_users}
              </li>
              <li>
                <strong>Número de medicamentos distintos registrados: </strong>
                {statistics.num_drugs}
              </li>
              <li>
                <strong>
                  Número de medicamentos tomados por los pacientes:{" "}
                </strong>
                {statistics.num_posologies}
              </li>
              <li>
                <strong>Total de registros de tensión tomadas: </strong>
                {statistics.num_pressures}
              </li>
              <li>
                <strong>
                  Total de mensajes intercambiados en la aplicación:{" "}
                </strong>
                {statistics.num_messages}
              </li>
            </ul>
          </Col>
          <Col sm={7}>
            <h3>Clasificación general (Top 10):</h3>
            <Table striped hover bordered responsive="sm">
              <thead>
                <tr>
                  <th>Posición</th>
                  <th>ID Paciente</th>
                  <th>Código Paciente</th>
                  <th>Nombre de usuario</th>
                  <th>Puntuación</th>
                </tr>
              </thead>
              <tbody>
                {usersClassification.map((user, index) => {
                  return (
                    <tr
                      key={user.id}
                      onClick={() => alert(user.username)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{index + 1}</td>
                      <td>{user.id}</td>
                      <td>{user.patient_code}</td>
                      <td>{user.username}</td>
                      <td>{user.points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
