import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap"; 

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => {onMovieClick(movie)}} variant="link">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.Name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    director: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};