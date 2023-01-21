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
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLoggedIn,
  logOutReducer,
} from "../../../features/auth/state/authSlice";
import { isStaff } from "../../../features/auth/services/authService";

function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  // TODO: ver cómo integrar BreadCrumb aquí
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
          {isLoggedIn && (
            <>
              <Nav className="me-auto">
                {isStaff() && (
                  <>
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
                  </>
                )}
              </Nav>
              <Form>
                <Button
                  data-cy="logOut"
                  type="button"
                  onClick={() => dispatch(logOutReducer())}
                >
                  Log out
                </Button>
              </Form>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
