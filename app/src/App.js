import React from "react";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import "./App.css";
import LoginPage from "./components/LoginPage";
import SignUpForm from "./components/SignUp";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import PostCollection from "./components/PostCollection";
import PrivateRoute from "./components/PrivateRoute";

import reducer from "./reducers";
import PostCard from "./components/PostCard";
import { previousPosts } from "./components/PostCollection";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <div className="content-container">
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={SignUpForm} />
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute exact path="/post-history">
            <PostCollection />
          </PrivateRoute>
          <PrivateRoute path="/post-history/post:id">
            <PostCard postData={previousPosts[0]} />
          </PrivateRoute>
        </div>
      </Provider>
    </div>
  );
}

export default App;
// http://localhost:3000/dashboard?state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiUmVkZGl0QXV0aFRva2VuIiwiaWQiOjE3LCJpYXQiOjE1NzQyNTgzMjYsImV4cCI6MTU3NDI4NzEyNn0.qbMzIPv0YnIGFURt7c55l8yQ34SaqwqHaGHxfKWXdXc&code=gX9IJTGiQ5cng6PUIhlEes-h8zg
