import React from "react";
import React, { useState } from "react";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
    const isReq = validate();
    if (isReq) {
      // Send a request to the server for authentication
      axios
        .post("https://swagflix.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log("no such user");
        });
    }
  };

  return (
    <form>
      <label>
        Username:
        <input
          type="text"
          value={this.state.username}
          onChange={this.onUsernameChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
      </label>
      <Button className="" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
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
