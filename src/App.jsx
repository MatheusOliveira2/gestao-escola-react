import { Container, Navbar, Nav } from 'react-bootstrap';
import './App.css';
import Routes from './routes/routes';

function App() {
  return (
    <div>
      <Navbar bg="dark">
        <Navbar.Brand href="/">Gerenciamento Escolar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link className="nav" href="/">
            Home
          </Nav.Link>
          <Nav.Link href="/students">Alunos</Nav.Link>
          <Nav.Link href="/teachers">Professores</Nav.Link>
          <Nav.Link href="/classes">Turmas</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="App">
        <Routes />
      </Container>
    </div>
  );
}

export default App;
