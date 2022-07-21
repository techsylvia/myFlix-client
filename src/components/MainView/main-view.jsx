import React from "react";
import axios from "axios";
import { Navbar, Container, Col, Row, Nav } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

import { LoginView } from "../LoginView/login-view";
import { MovieView } from "../MovieView/movie-view";
import { MovieCard } from "../MovieCard/movie-card";
import { RegistrationView } from "../../RegistrationView/registration-view";

export class MainView extends React.Component {
  //way to identify whether there was a user click or not.
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      token: null,
    };
  }

  componentDidMount() {
    if (!this.state.token) return;
  }

  componentDidUpdate() {
    if (this.state.movies.length > 1) return;
    axios
      .get("https://sylvmovieapp.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${this.state.token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(data) {
    this.setState({
      user: data.user.Username,
      token: data.token,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!this.state.user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view">!</div>;

    return (
      <div className="main-view">
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Link</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Link</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {selectedMovie ? (
          <Row className="justify-content-md-center">
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />{" "}
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-md-center">
            {movies.map((movie) => (
              <Col md={3}>
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
  }
}

export default MainView;
