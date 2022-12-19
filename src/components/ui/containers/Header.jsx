import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header(props) {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              alt="Logo de YATA HTA"
              src="src/assets/stethoscope.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            YATA HTA
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse />
      </Navbar>
    </header>
  );
}

export default Header;
