import PropTypes from "prop-types";
<<<<<<< HEAD
import { Button, Card } from "react-bootstrap";
=======
import { Card } from "react-bootstrap";
>>>>>>> 8442577241a93592fdb20c5365302c4d9eadf865
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
<<<<<<< HEAD
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.Name}</Card.Text>
        <Link to={`movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
=======
    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Card className="h-100">
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director.Name}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
>>>>>>> 8442577241a93592fdb20c5365302c4d9eadf865
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
  }).isRequired,
};
