import React from "react";

import About from './pages/About';
import Home from './pages/Home';
import Users from './pages/Users';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// import Amplify from 'aws-amplify';

// import aws_exports from './aws-exports';

// Amplify.configure(aws_exports);

export default function App() {
  return (
    <Router>
      <Container fluid style={{height: '100vh'}}>
        <Row style={{height: '100vh', 'backgroundColor': '#eeeeee'}}>
          <Col xs={12} style={{'alignSelf': 'start'}}>
            <Navbar bg="light" expand="lg" style={{margin: '0 -15px'}}>
              <Navbar.Brand href="#home">Jackie D</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/about">
                    Design
                  </Nav.Link>
                  <Nav.Link as={Link} to="/users">
                    Database
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            </Col>
            <Col xs={12} style={{'alignSelf': 'start'}}>
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Col>
        </Row>
      </Container>
    </Router>
  );
}