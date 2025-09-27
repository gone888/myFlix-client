import { useState } from "react";
import { Col, Row, Container, Card, Button, Form } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";

export const ProfileView = ({ user, token, movies }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  let favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));

  const UpdateUserInfo = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`https://movie-api-jbxn.onrender.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem(
          "user",
          JSON.stringify(data),
          alert("User information updated successfully"),
          window.location.reload()
        );
      })
      .catch((e) => {
        alert("Something went wrong ");
      });
  };

  const DeleteUser = (event) => {
    event.preventDefault();

    fetch(`https://movie-api-jbxn.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("User was successfully deleted");
          localStorage.clear();
          window.location.reload();
        } else {
          alert("Error");
        }
      })
      .catch((e) => {
        alert("Something went wrong ");
      });
  };

  const removeFromFavorites = (id) => {
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
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo user={user} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser
                UpdateUserInfo={UpdateUserInfo}
                DeleteUser={DeleteUser}
                user={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                email={email}
                setEmail={setEmail}
                birthday={birthday}
                setBirthday={setBirthday}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavMovies
        favoriteMovies={favoriteMovies}
        removeFromFavorites={removeFromFavorites}
      />
    </Container>
  );
};
