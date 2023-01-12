import React from "react";
import {
  Button,
  Container,
  Navbar,
  Form,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getUser } from "../../../services/AuthService";

function Header({ isLoggedIn, logOut }) {
  const user = getUser();
  return (
    <header>
      <Navbar
        collapseOnSelect
        bg="primary"
        variant="dark"
        expand="lg"
        className="px-3"
      >
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
        {/* <LinkContainer to="/">{username}</LinkContainer> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <LinkContainer to="/patients">
              <Nav.Link>Pacientes</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Configuración">
              <LinkContainer to="/">
                <NavDropdown.Item>Cambiar contraseña</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/">
                <NavDropdown.Item>Link</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/">
                <NavDropdown.Item>Link</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
          {isLoggedIn && (
            <Form>
              <Button data-cy="logOut" type="button" onClick={() => logOut()}>
                Log out
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
