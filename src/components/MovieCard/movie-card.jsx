import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss'

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    console.log(movie)

    return (
      <Container fluid className="movieCardContainer">
        <Row>
          <Col>
            <CardGroup>
              <Card className="movieCard mt-3 mb-3">
                <Card.Img variant="top" src={movie?.ImagePath} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>
                    <Button className="button-style" variant="warning">Open</Button>
                  </Link>
                  {/* <Button onClick={() => onMovieClick(movie)} variant="link">
                    Open
                  </Button> */}
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    RunTime: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
