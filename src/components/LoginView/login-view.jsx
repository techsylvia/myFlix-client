import React from "react";
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Button,
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  /* const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");*/

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios
      .post("https://sylvmovieapp.herokuapp.com/login", null, {
        params: {
          Username: username,
          Password: password,
        },
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.error(e);
        console.log("no such user");
      });
  };

  return (
    <Container fluid className="loginContainer my-3 mx-12 ">
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body className="mt-3 ">
                <Card.Title>Welcome to MyFlix</Card.Title>
                <Form>
                  <Form.Group controlId="formUserName">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter Username"
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter Password"
                    />
                  </Form.Group>
                  <Button
                    className="mt-3"
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
