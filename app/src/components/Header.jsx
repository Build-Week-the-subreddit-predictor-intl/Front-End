import React from "react";
import { useSelector } from "react-redux";
import { Route, NavLink } from "react-router-dom";
import { NavWrapper } from "./styled-components";

export default function Header() {
  const loggedIn = useSelector(state => state.loggedIn);
  return (
    <header>
      <NavWrapper>
        <div className="logo">OUR LOGO</div>
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard">New Post</NavLink>
            </li>
            <li>
              <NavLink to="/post-history">Post History</NavLink>
            </li>
            <li>
              <NavLink to="/register">Sign Up</NavLink>
            </li>
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
