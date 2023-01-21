import React from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Landing() {
  return (
    <Container>
      <Row xs="auto" className="align-content-center justify-content-center">
        <Col>
          <Card className="shadow mt-3">
            <Card.Body>
              <Container
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="src/assets/stethoscope.svg"
                  alt="Logo de YATA HTA"
                  width={90}
                  height={90}
                  className="me-4"
                />
                <div>
                  <h1>YATA</h1>
                  <h1>HTA</h1>
                </div>
              </Container>
              <div className="d-grid mt-2">
                <LinkContainer to="/log-in">
                  <Button data-cy="logIn">Log in</Button>
                </LinkContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
