import React, { useState } from "react";
//user registration form taking necessary user details
export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
}

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(username, password, email, birthday);
  props.onRegister(false);
};
