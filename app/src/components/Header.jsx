import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { NavWrapper } from "./styled-components";
import logo from '../images/logo.jpg'

export default function Header() {
  const loggedIn = useSelector(state => state.loggedIn);
  return (
    <header>
      <NavWrapper>
        <img className="logo" src = {logo} alt="" />
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard">New Post</NavLink>
            </li>
            <li>
              <NavLink to="/post-history">Post History</NavLink>
            </li>
            {!loggedIn && (
              <li>
                <NavLink to="/register">Sign Up</NavLink>
              </li>
            )}
            <li>
              {loggedIn ? (
                <NavLink to="/logout">Logout</NavLink>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </li>
          </ul>
        </nav>
      </NavWrapper>
    </header>
  );
}
