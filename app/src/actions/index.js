import { useHistory } from "react-router-dom";

import axiosAuth from "../utils/axiosAuth";

const baseUrl = `https://subreddit-predictor.herokuapp.com/api`;

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOADING = "LOADING";
export const LOAD_COMPLETE = "LOAD_COMPLETE";

const loading = () => ({ type: LOADING });

const loadComplete = () => ({ type: LOAD_COMPLETE });

const loginSuccess = payload => ({ type: LOGIN_SUCCESS, payload });

const login = ({ username, password }) => dispatch => {
  dispatch(loading());
  return axiosAuth()
    .post(`${baseUrl}/auth/login`, { username, password })
    .then(res => {
      sessionStorage.setItem("token", res.data.token);
      dispatch(loginSuccess(username));
    })
    .catch(err => console.error(err));
};

const register = ({ username, password }) => dispatch => {
  dispatch(loading());

  return axiosAuth()
    .post(`${baseUrl}/auth/register`, { username, password })
    .then(() => {
      dispatch(loadComplete());
    })
    .catch(err => console.error(err));
};

export default {
  login,
  register
};
