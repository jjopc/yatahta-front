import React from "react";
import Header from "./containers/Header";
import { Button, ButtonGroup, Container, Stack } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Layout({ isLoggedIn, children }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Container fluid className="middle-flex">
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
        <ButtonGroup>
          <LinkContainer to="/sign-up">
            <Button data-cy="signUp">Sign up</Button>
          </LinkContainer>
          <LinkContainer to="/log-in">
            <Button data-cy="logIn">Log in</Button>
          </LinkContainer>
        </ButtonGroup>
      </Container>
    </>
  );
}
