import React from "react";
import { Button, Container, Navbar, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header({ isLoggedIn }) {
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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn && (
            <Form>
              <Button type="button">Log out</Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
