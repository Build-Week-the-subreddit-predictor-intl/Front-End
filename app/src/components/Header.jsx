import React from "react";
import { Route, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
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
            {
              loggedIn ? 
              <li>
                <NavLink to="/login">Log out</NavLink>
              </li>
              :
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            }
          </ul>
        </nav>
      </NavWrapper>
    </header>
  );
}
