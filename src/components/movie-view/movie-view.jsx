import { useParams, Link } from "react-router";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const MovieView = ({ movies, user, token }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  let favMovs = user.FavoriteMovies;
  let movToBeAdded = movie.id;

  function checkIfMovieAlreadyExists(movToBeAdded, favMovs) {
    for (let i = 0; i < favMovs.length; i++) {
      if (favMovs[i] === movToBeAdded) {
        console.log("true");
        return true;
      }
    }
    console.log("false");
    return false;
  }

  const addToFavorites = (event) => {
    event.preventDefault();

    if (checkIfMovieAlreadyExists(movToBeAdded, favMovs) === true) {
      alert("Movie is already in favorites");
    } else {
      fetch(
        `https://movie-api-jbxn.onrender.com/users/${user.Username}/movies/${movie.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            localStorage.setItem(
              "user",
              JSON.stringify(data),
              alert("Movie was added to your favorites")
            );
            window.location.reload();
          } else {
            alert("There was an error adding the movie from your favorites");
          }
        })
        .catch((e) => {
          alert("Something went wrong");
        });
    }
  };

  const removeFromFavorites = (id) => {
    if (checkIfMovieAlreadyExists(movToBeAdded, favMovs) === false) {
      alert("Movie is not in favorites");
    } else {
      fetch(
        `https://movie-api-jbxn.onrender.com/users/${user.Username}/movies/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            localStorage.setItem(
              "user",
              JSON.stringify(data),
              alert("Movie was removed from favorites")
            );
            window.location.reload();
          } else {
            alert("There was an error removing the movie from your favorites");
          }
        })
        .catch((e) => {
          alert("Something went wrong");
        });
    }
  };

  return (
    <div>
      <div>
        <img className="w-100" src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.Name}</span>
      </div>
      <Link to={`/`}>
        <Button className="me-3 back-button">Back</Button>
      </Link>
      <Button className="me-3" onClick={addToFavorites}>
        Add to favorites
      </Button>
      <Button className="me-3" onClick={() => removeFromFavorites(movie.id)}>
        Remove from favorites
      </Button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
