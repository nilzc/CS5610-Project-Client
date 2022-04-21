import {useDispatch, useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {logout} from "../../redux/actions";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const NavigationBar = () => {
    const navigate = useNavigate();
    const loggedIn = useSelector(isLoggedIn);
    const dispatch = useDispatch();
    const logoutButtonOnClick = () => {
        logout(dispatch)
            .then(() => {
                alert("Logout successful!");
            })
            .catch(err => err.response.data.error)
    }
    const location = useLocation();
    return (
        <>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>LPQK Movies</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home"  className={`nav-link ${location.pathname.indexOf('home') >= 0 ? 'active':''}`} >Home</Nav.Link>
              <Nav.Link href="/search"  className={`nav-link ${location.pathname.indexOf('search') >= 0 ? 'active':''}`}>Search Movie</Nav.Link>
              {loggedIn && <>
                <Nav.Link  className={`nav-link ${location.pathname.indexOf('profile') >= 0 ? 'active':''}`}  href="/profile">
                Profile
              </Nav.Link>
              <Nav.Link  className={`nav-link ${location.pathname.indexOf('new') >= 0 ? 'active':''}`}  href="/lists/new">
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