import React from "react";
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

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
    <form>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
