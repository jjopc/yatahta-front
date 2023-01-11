import React from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Landing({ isLoggedIn }) {
  return (
    <Container className="text-center">
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
        />
        <div>
          <h1>YATA</h1>
          <h1>HTA</h1>
        </div>
      </Container>
      {isLoggedIn ? (
        <></>
      ) : (
        <ButtonGroup>
          <LinkContainer to="/sign-up">
            <Button data-cy="signUp">Sign up</Button>
          </LinkContainer>
          <LinkContainer to="/log-in">
            <Button data-cy="logIn">Log in</Button>
          </LinkContainer>
        </ButtonGroup>
      )}
    </Container>
  );
}
