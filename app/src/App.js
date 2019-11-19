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
import Dashboard from "./components/Dashboard";
import PostCollection from "./components/PostCollection";
import PrivateRoute from "./components/PrivateRoute";

import reducer from "./reducers";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <div className="content-container">
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={SignUpForm} />
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/post-history">
            <PostCollection />
          </PrivateRoute>
        </div>
      </Provider>
    </div>
  );
}

export default App;
