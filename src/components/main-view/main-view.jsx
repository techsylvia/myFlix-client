import React from "react";

import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "./movie-card";

export class MainView extends React.Component {
  //way to identify whether there was a user click or not.
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "Inception",
          Description: "des c1...",
          ImagePath: "...",
        },
        {
          _id: 2,
          Title: "The Shawshank Redemption",
          Description: "desc2...",
          ImagePath: "...",
        },
        {
          _id: 3,
          Title: "Gladiator",
          Description: "desc3...",
          ImagePath: "...",
        },
      ],
    };
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0)
      return <div className="main-view">The list is empty</div>;

    return (
      <div className="main-view">
        <button
          onClick={() => {
            alert("Nice!");
          }}
        >
          Click me!
        </button>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            onMovieClick={(newSelectedMovie) => {
              this.state.selectedMovie = newSelectedMovie;
            }}
          />
        ))}
      </div>
    );
  }
}

export default MainView;
