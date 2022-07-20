import React from "react";
import ReactDom from "react-dom";
import MainView from "./components/MainView/main-view";
import Container from "react-bootstrap/Container";
// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Finds the root of your app

const container = document.getElementsByClassName("app-container")[0];

//Tells react to render your app in the root Dom element
ReactDom.render(React.createElement(MyFlixApplication), container);
