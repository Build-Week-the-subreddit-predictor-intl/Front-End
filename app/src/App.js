import React from "react";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import "./App.css";
import LoginForm from "./components/Login";
import SignUpForm from "./components/SignUp";
import Header from "./components/Header";
import Dasboard from "./components/Dashboard";
import PostCollection from "./components/PostCollection";

import reducer from "./reducers";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <div className = "content-container">
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={SignUpForm} />
          <Route path="/dashboard" component={Dasboard} />
          <Route path="/post-history" component={PostCollection} />
        </div>
      </Provider>
    </div>
  );
}

export default App;
