import { Card } from "react-bootstrap";

export const UserInfo = ({ user }) => {
  return (
    <div>
      <h4>User Information:</h4>
      <Card.Body>
        <Card.Text>Name: {user.Username}</Card.Text>
        <Card.Text>Email: {user.Email}</Card.Text>
      </Card.Body>
    </div>
  );
};
