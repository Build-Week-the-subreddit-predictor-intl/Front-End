import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import LoginForm from './components/Login';
import SignUpForm from './components/SignUp'
import Header from './components/Header';
import Dasboard from './components/Dashboard';


function App() {
  return (
    <div className="App">
      <Header/>
      <Route path = "/login" component = {LoginForm}/>
      <Route path = "/register" component = {SignUpForm}/>
      <Route path = "/dashboard" component = {Dasboard}/>
    </div>
  );
}

export default App;
