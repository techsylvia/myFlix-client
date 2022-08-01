import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import React, { useState } from "react";
import axios from "axios";

//user registration form taking necessary user details
export function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    axios
      .post("https://sylvmovieapp.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        console.log(response.data)
        alert("Registration successful, please login!");
        window.open('/', '_self');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className='container-style'>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Register</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder='Enter a username'
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      minLength='4'
                      placeholder='Your password must be 4 or more characters'
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth:</Form.Label>
                    <Form.Control
                      type='date'
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder='Enter a valid Email address'
                      required
                    />
                  </Form.Group>

                  <Button variant='warning'
                    type='submit'
                    onClick={handleSubmit}>
                    Sign Up
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
