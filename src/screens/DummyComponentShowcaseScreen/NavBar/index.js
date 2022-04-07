import React from "react";
import "./index.css";
import { Nav, Navbar, Container } from "react-bootstrap";

const Navbar1 = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#landingpage">LPQK Movies</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#movies">Movies</Nav.Link>
              <Nav.Link href="#tvshows">TV Shows</Nav.Link>
              <Nav.Link href="#newrelease">New Releases</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#login">Login</Nav.Link>
              <Nav.Link eventKey={2} href="#signup">
                Sign Up
              </Nav.Link>
              <Nav.Link
                eventKey={3}
                href="https://github.com/ZhuochengLin/CS5610-Project-Client"
              >
                <i className="fab fa-github"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbar1;
