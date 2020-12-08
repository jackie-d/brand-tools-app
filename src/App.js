import React from "react";

import About from './pages/About';
import Home from './pages/Home';
import Users from './pages/Users';
import Redux from './pages/Redux';

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

import Amplify from 'aws-amplify';

import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

export default function App() {
  return (
    <Router>
      <Container fluid style={{height: '100vh'}}>
        <Row style={{height: '100vh', 'background-color': '#eeeeee'}}>
          <Col xs={12}>
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
                    Database (GraphQL + Redux)
                  </Nav.Link>
                  <Nav.Link as={Link} to="/redux">
                    Redux
                  </Nav.Link>
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
            </Col>
            <Col xs={12}>
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/redux">
                  <Redux />
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