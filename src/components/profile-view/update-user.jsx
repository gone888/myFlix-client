import { Button, Form, Row } from "react-bootstrap";

export const UpdateUser = ({
  UpdateUserInfo,
  DeleteUser,
  username,
  setUsername,
  password,
  setPassword,
  email,
  setEmail,
  birthday,
  setBirthday,
}) => {
  return (
    <>
      <Row>
        <h4>Update User Info:</h4>
        <Form onSubmit={DeleteUser}>
          <Button type="submit">Delete account</Button>
        </Form>
        <Form onSubmit={UpdateUserInfo}>
          <Form.Group controlid="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength="3"
              required
              placeholder="Enter a username"
            />
          </Form.Group>

          <Form.Group controlid="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password must be at least 8 characters long"
            />
          </Form.Group>

          <Form.Group controlid="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
            />
          </Form.Group>

          <Form.Group mb={2} controlid="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              minLength={8}
            />
          </Form.Group>
          <Button type="submit" className="mt-2">
            Update
          </Button>
        </Form>
      </Row>
    </>
  );
};
