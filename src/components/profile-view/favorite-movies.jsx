import { Card, Col, Button, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavMovies = ({ favoriteMovies, removeFromFavorites }) => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <h4>Favorite Movies:</h4>
        </Col>
      </Row>

      <Row>
        {favoriteMovies.map((movie) => (
          <Col xs={12} md={6} lg={4} className="mb-5" key={movie.id}>
            <MovieCard movie={movie} />
            <Button onClick={() => removeFromFavorites(movie.id)}>
              Remove from favorites
            </Button>
          </Col>
        ))}
      </Row>
    </>
  );
};
