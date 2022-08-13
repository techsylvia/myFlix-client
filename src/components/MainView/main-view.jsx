import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { LoginView } from "../LoginView/login-view";
import MovieView from "../MovieView/movie-view";
import { MovieCard } from "../MovieCard/movie-card";
import { RegistrationView } from "../RegistrationView/registration-view";
import { Navbar } from "../Navbar/navbar";
import { ProfileView } from "../ProfileView/profile-view";
import { DirectorView } from "../DirectorView/director-view";
import { GenreView } from "../GenreView/genre-view";

import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { setMovies } from "../../actions/actions";


export class MainView extends React.Component {
  //way to identify whether there was a user click or not.
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://sylvmovieapp.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    console.log("Did mount");
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({
        ...this.state,
        user: localStorage.getItem("user"),
      });
      this.getMovies(token);
    }
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      ...this.state,
      selectedMovie: movie,
    });
  }
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(data) {
    console.log(data);
    this.setState({
      ...this.state,
      user: data.user.Username,
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user.Username);
    this.getMovies(data.token);
    // localStorage.setItem("movies", data.movies)
  }

  render() {
    let { user } = this.state;
    let { movies } = this.props;
    if (!user) {
      user = localStorage.getItem("user");
    }

    console.log(`movies: ${movies}`);
    return (
      <BrowserRouter>
        <Navbar user={user} />

        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;

              return movies.map((m) => (
                <Col md={6} lg={4} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />

          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/* route for link on main-view to profile-view */}
          <Route
            path={`/user/${user}`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    user={user}
                    movies={movies}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
