import React from "react";
import './navbar.scss';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function Navbar({ user }) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/");
  }

  const isLoggedIn = () => {
    if (typeof window == "undefined") {
      return false
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    }

    return
  };

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Container className="navbar-container">
          <Navbar.Brand as={Link} to={"/"} href="#home">MyFlix-App</Navbar.Brand>

          <Nav className="me-auto navbar-elements__style">

            {isLoggedIn() && (
              <Nav.Link as={Link} to={`/`}>Movies</Nav.Link>
            )}

            {isLoggedIn() && (
              <Nav.Link as={Link} to={`/user/${user}`}>Profile</Nav.Link>
            )}

            {isLoggedIn() && (
              <Nav.Link onClick={() => onLoggedOut()}>Logout</Nav.Link>
            )}

            {!isLoggedIn() && (
              <Nav.Link as={Link} to={`/`}>Login</Nav.Link>
            )}

            {!isLoggedIn() && (
              <Nav.Link as={Link} to={`/register`}>Sign Up</Nav.Link>
            )}


          </Nav>

        </Container>
      </Navbar>
    </Container>

  )
}