import "./firebase";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const initState = {
  lang: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en",
  country: "egypt",
  currency: "USD",
  search: "",
  token: null,
  cred: null,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case "CHANGE_LANG":
      return {
        ...state,
        lang: action.payload,
      };
    case "SEARCH_VALUE":
      return {
        ...state,
        search: action.payload,
      };
    case "CHANGE_COUNTRY":
      return {
        ...state,
        country: action.payload,
      };
    case "CHANGE_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "SET_CRED":
      return {
        ...state,
        token: action.payload.uid,
        cred: action.payload,
      };
    case "SIGNOUT":
      return {
        ...state,
        token: null,
        cred: null,
      };
    default:
      return state;
  }
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
