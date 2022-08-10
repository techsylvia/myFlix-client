import { func } from "prop-types";
import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES, SET_USER, SET_AUTH } from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      console.log("SET_MOVIES reducer reached");
      return action.value;
    default:
      return state;
  }
}

function getAuth() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    return { token: token, user: user };
  }
  return null;
}

function setAuth(state = getAuth(), action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        token: action.value.token,
        user: action.value.user,
      };
    default:
      return state;
  }
}

function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      console.log("SET_USER reducer reached");
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  setAuth,
  user,
});

export default moviesApp;
