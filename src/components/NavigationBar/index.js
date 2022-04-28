import {useDispatch, useSelector} from "react-redux";
import {getProfile, isLoggedIn} from "../../redux/selectors";
import {logout} from "../../redux/actions";
import {useLocation} from "react-router-dom";
import React from "react";
import {Nav, Navbar, Container} from "react-bootstrap";
import {ADMIN, MY_PROFILE_URL, SUPER} from "../../services/utils";

const NavigationBar = () => {
    const loggedIn = useSelector(isLoggedIn);
    const profile = useSelector(getProfile);
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
                    <Navbar.Brand href={"/home"}>LPQK Movies</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home"
                                      className={`nav-link ${location.pathname.indexOf('home') >= 0 ? 'active' : ''}`}>Home</Nav.Link>
                            <Nav.Link href="/search"
                                      className={`nav-link ${location.pathname.indexOf('search') >= 0 ? 'active' : ''}`}>Search
                                Movie</Nav.Link>
                            {loggedIn && <>
                                <Nav.Link
                                    className={`nav-link ${location.pathname.indexOf('profile') >= 0 ? 'active' : ''}`}
                                    href={MY_PROFILE_URL}>
                                    Profile
                                </Nav.Link>
                                <Nav.Link
                                    className={`nav-link ${location.pathname.indexOf('new') >= 0 ? 'active' : ''}`}
                                    href="/lists/new">
                                    Create List
                                </Nav.Link>
                                {
                                    (profile.role === ADMIN || profile.role === SUPER) &&
                                    <Nav.Link
                                        className={`nav-link ${location.pathname.indexOf('admin') >= 0 ? 'active' : ''}`}
                                        href="/admin">
                                        Admin Tool
                                    </Nav.Link>
                                }
                            </>}
                        </Nav>
                        {loggedIn &&
                            <Nav>
                                <Nav.Link href={MY_PROFILE_URL}>Hi, {profile.username}</Nav.Link>
                                <Nav.Link onClick={logoutButtonOnClick}>Logout</Nav.Link>
                                <Nav.Link href="https://github.com/ZhuochengLin/CS5610-Project-Client">
                                    <i className="fab fa-github"/>
                                </Nav.Link>
                            </Nav>}
                        {!loggedIn &&
                            <Nav>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
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