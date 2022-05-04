import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const initState = {
  lang: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en",
  country: "egypt",
  currency: "USD",
  token: null,
};

function reducer(state = initState, action) {
  if (action.type === "CHANGE_LANG") {
    return {
      ...state,
      lang: action.payload,
    };
  }
  if (action.type === "CHANGE_COUNTRY") {
    return {
      ...state,
      country: action.payload,
    };
  }
  if (action.type === "CHANGE_CURRENCY") {
    return {
      ...state,
      currency: action.payload,
    };
  }
  return state;
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
