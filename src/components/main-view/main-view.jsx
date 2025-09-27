import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { MoviesFilter } from "../movies-filter/movies-filter";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const movieSearch = (query) => {
    if (query === "") {
      setFilteredMovies(movies);
    } else {
      const lowercasedMovie = query.toLowerCase();
      const newFilteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(lowercasedMovie)
      );
      setFilteredMovies(newFilteredMovies);
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movie-api-jbxn.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            actors: movie.Actors,
            genre: movie.Genre,
            description: movie.Description,
            director: movie.Director,
            featured: movie.Featured,
          };
        });
        setIsLoading(false);
        setMovies(moviesFromApi);
        setFilteredMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          localStorage.clear();
          window.location.reload();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/" />
                ) : (
                  <Col>
                    {isLoading ? (
                      <p>Loading data...</p>
                    ) : (
                      <ProfileView
                        movies={movies}
                        user={user}
                        token={token}
                        dataLoaded={!isLoading}
                      />
                    )}
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col>
                    <MovieView movies={movies} user={user} token={token} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <Row>
                      <Col className="mb-2">
                        <MoviesFilter onSearch={movieSearch} />
                      </Col>
                    </Row>
                    {filteredMovies.map((movie) => (
                      <Col className="mb-2" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
