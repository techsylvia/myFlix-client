// import React from "react";
// import PropTypes from "prop-types";
// import axios from "axios";

// export class MovieView extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       movies: [],
//       user: null,
//     };
//   }
//   keypressCallback(event) {
//     console.log(event.key);
//   }
//   componentDidMount() {
//     document.addEventListener("keypress", this.keypressCallback);
//   }

//   componentWillUnmount() {
//     document.removeEventListener("keypress", this.keypressCallback);
//   }

//   render() {
//     const { movie, onBackClick } = this.props;

//     return (
//       <div className="movie-view">
//         <div className="movie-poster">
//           <img src={movie.ImagePath} />
//         </div>
//         <div className="movie-title">
//           <span className="label">Title: </span>
//           <span className="value">{movie.Title}</span>
//         </div>

//         <div className="movie-description">
//           <span className="label">Description:</span>
//           <span className="value">{movie.Description}</span>
//         </div>
//         <div className="movie-releaseyear">
//           <span className="label">ReleaseYear: </span>
//           <span className="value">{movie.ReleaseYear}</span>
//         </div>
//         <div className="movie-runtime">
//           <span className="label">RunTime: </span>
//           <span className="value">{movie.RunTime}</span>
//         </div>

//         <button
//           onClick={() => {
//             onBackClick(null);
//           }}
//         >
//           Back
//         </button>
//       </div>
//     );
//   }
// }

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string,
//     Description: PropTypes.string.isRequired,
//     ReleaseYear: PropTypes.string.isRequired,
//     RunTime: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birth: PropTypes.string.isRequired,
//     }),
//     ImagePath: PropTypes.string,
//   }).isRequired,
// };

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      FavouriteMovies: [],
    };
  }

  getUser(token) {
    let user = localStorage.getItem("user");
    axios
      .get(`https://sylvmovieapp.herokuapp.com/user/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          FavouriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((e) => console.log(e));
  }
  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  // Add Favourite movie 
  addFavMovie = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    let userFavMovies = this.state.FavouriteMovies;
    let isFav = userFavMovies.includes(this.props.movie._id);
    if (!isFav) {
      axios.post(`https://sylvmovieapp.herokuapp.com/user/${user}/${this.props.movie.Title}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
          console.log(response.data);
          alert(
            `${this.props.movie.Title} has been added to your list of movies`
          );
          window.open(`/movies/${this.props.movie._id}`, "_self");
        })
        .catch(e => {
          console.log('Error')
        });
    } else if (isFav) {
      alert(
        `${this.props.movie.Title} is already present in your list of movies`
      );
    }
  }

  // Delete a movie from Favourite movies 
  removeFavMovie = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    axios.delete(`https://sylvmovieapp.herokuapp.com/user/${user}/${this.props.movie._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        console.log(response.data);
        alert(
          `${this.props.movie.Title} has been removed from your list of movies`
        );
        window.open(`/movies/${this.props.movie._id}`, "_self");
      })
      .catch(e => {
        console.log('Error')
      });
  }

  render() {
    const { movie, onBackClick } = this.props;
    let userFavMovies = this.state.FavouriteMovies;
    let isFav = userFavMovies.includes(this.props.movie._id);

    return (

      <Container>
        <Row>
          <Col>
            <Card className="movie-view__card" style={{ width: '40rem' }}>
              <Card.Body>
                <Card.Img className="movie-view__image" variant="top" src={movie.ImagePath} />
                <Card.Title className="title-style">{movie.Title}</Card.Title>

                <Card.Text className="text-style">Genre: {movie.Genre.Name}
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">more info</Button>
                  </Link>
                </Card.Text>

                <Card.Text className="text-style">Director: {movie.Director.Name}
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">more info</Button>
                  </Link>
                </Card.Text>

                <Card.Text className="text-style">{movie.Description}</Card.Text>
                <Button variant="outline-warning" onClick={() => { onBackClick() }}>Back</Button>

                {!isFav && (
                  <Button className="add-list__button" variant="warning" onClick={this.addFavMovie}>Add to your list</Button>
                )}
                {isFav && (
                  <Button className="add-list__button" variant="warning" onClick={this.removeFavMovie}>Remove from your list</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};