import {useDispatch, useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {logout} from "../../redux/actions";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const NavigationBar = () => {
    const navigate = useNavigate();
    const loggedIn = useSelector(isLoggedIn);
    const dispatch = useDispatch();
    const logoutButtonOnClick = () => {
        logout(dispatch)
            .then(() => {
                navigate("/home");
                alert("Logout successful!");
            })
            .catch(err => err.response.data.error)
    }
    return (
        <>
        <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#landingpage">LPQK Movies</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/search">Search Movie</Nav.Link>
              {loggedIn && <>
                <Nav.Link  href="/profile">
                Profile
              </Nav.Link>
              <Nav.Link  href="/list/new">
              Create List
              </Nav.Link>
              </>}
            </Nav>
            {loggedIn &&
            <Nav>
              <Nav.Link onClick={logoutButtonOnClick}>Logout</Nav.Link>
              
              <Nav.Link
                href="https://github.com/ZhuochengLin/CS5610-Project-Client"
              >
                <i className="fab fa-github"></i>
              </Nav.Link>
            </Nav>}
            {!loggedIn &&
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link  href="/register">Register</Nav.Link>
              <Nav.Link
       
                href="https://github.com/ZhuochengLin/CS5610-Project-Client"
              >
                <i className="fab fa-github"></i>
              </Nav.Link>
            </Nav>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </>
    )
};
export default NavigationBar;