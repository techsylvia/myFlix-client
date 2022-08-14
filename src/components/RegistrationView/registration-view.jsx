import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

//user registration form taking necessary user details
export function RegistrationView() {
  const history = useHistory()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [values, setValues] = useState({
    usernameError: '',
    passwordError: '',
    emailError: '',
    birthdayError: ''
  })

  const isValid = () => {
    if (!username) {
      setValues({ ...values, usernameError: 'Username Required' });
    } else if (username.length < 2) {
      setValues({ ...values, usernameError: 'Username must be 2 or more characters long' });
    }
    if (!password) {
      setValues({ ...values, passwordError: 'Password is required.' });
    } else if (password.length < 6) {
      setValues({ ...values, passwordError: 'Password must be 6 or more characters long' });
    }
    if (!email) {
      setValues({ ...values, emailError: 'Please use a valid email' });
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Please use a valid email' });
    }
    if (!birthday) {
      setValues({ ...values, birthdayError: 'Birthdate required' });
    }

    return Object.values(values).every(el => el === '');
  }

  const handleSubmit = (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    if (isValid()) {
      console.log('registration form is valid');
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
          history.push('/')
        })
        .catch((error) => {
          console.log(error);
        });
    }

    console.log(Object.values(values))
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
                      isInvalid={values.usernameError !== ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {values.usernameError}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      minLength='6'
                      placeholder='Your password must be 6 or more characters'
                      required
                      isInvalid={values.passwordError !== ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {values.passwordError}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth:</Form.Label>
                    <Form.Control
                      type='date'
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)}
                      isInvalid={values.birthdayError !== ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {values.birthdayError}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder='Enter a valid Email address'
                      required
                      isInvalid={values.emailError !== ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {values.emailError}
                    </Form.Control.Feedback>
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
