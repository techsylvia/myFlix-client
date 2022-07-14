import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

export class MovieCard extends React.Component {
  addMovie(movie, user) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log(movie);
    console.log(token);
  }
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <div onClick={() => onMovieClick(movie)} className="movie-card">
        {movie.Title}
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({}),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
