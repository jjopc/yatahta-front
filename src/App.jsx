import Layout from "./components/ui/Layout";
import { Button, ButtonGroup, Container, Stack } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  // Implementar la lógica de comprobación de user logueado:
  // si está logueado muestra página de inicio, sino muestra acceso a login o registro
  return (
    <Layout>
      <Container fluid className="middle-center">
        {/* <img
          src="src/assets/stethoscope.svg"
          alt="Logo de YATA HTA"
          width={50}
          height={50}
        /> */}
        <h1>YATA HTA</h1>
        <ButtonGroup>
          <LinkContainer to="/sign-up">
            <Button data-cy="signUp">Sign up</Button>
          </LinkContainer>
          <LinkContainer to="/log-in">
            <Button data-cy="logIn">Log in</Button>
          </LinkContainer>
        </ButtonGroup>
      </Container>
    </Layout>
  );
}

export default App;
