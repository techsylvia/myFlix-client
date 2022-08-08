import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import { createStore } from "redux";
import { Provider } from "react-redux";
import moviesApp from "./reducers/reducers";

import { MainView } from "./components/main-view/main-view";

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
