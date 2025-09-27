import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
<<<<<<< HEAD
import { Col, Row, Button } from "react-bootstrap";
=======
import { ProfileView } from "../profile-view/profile-view";
import { Col, Row } from "react-bootstrap";
>>>>>>> 8442577241a93592fdb20c5365302c4d9eadf865
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [isLoading, setIsLoading] = useState(true);

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
      });
  }, [token]);

  return (
    <BrowserRouter>
<<<<<<< HEAD
      <NavigationBar user={user} onLoggedOut={() => setUser(null)} />
=======
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          localStorage.clear();
          window.location.reload();
        }}
      />
>>>>>>> 8442577241a93592fdb20c5365302c4d9eadf865
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 8442577241a93592fdb20c5365302c4d9eadf865
                  </Col>
                )}
              </>
            }
          />
          <Route
<<<<<<< HEAD
=======
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
>>>>>>> 8442577241a93592fdb20c5365302c4d9eadf865
            path="movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col>
<<<<<<< HEAD
                    <MovieView movies={movies} />
=======
                    <MovieView movies={movies} user={user} token={token} />
>>>>>>> 8442577241a93592fdb20c5365302c4d9eadf865
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
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
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
