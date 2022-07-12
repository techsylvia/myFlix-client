import React from "react";
import React, { useState } from "react";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  
  export class LoginView extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        username: "",
        password: "",
      };

      this.onUsernameChange = this.onUsernameChange.bind(this);
      this.onPasswordChange = this.onPasswordChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    onUsernameChange(event) {
      this.setState({
        username: event.target.value,
      });
    }

    onPasswordChange(event) {
      this.setState({
        password: event.target.value,
      });
    }

   const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    // props.onLoggedIn(username);
  };

    render() {
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
          <button type="button" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      );
    }
  }
}
