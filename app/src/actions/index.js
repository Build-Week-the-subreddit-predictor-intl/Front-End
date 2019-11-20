import axiosAuth from "../utils/axiosAuth";

const baseUrl = `https://subreddit-predictor.herokuapp.com/api`;

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOADING = "LOADING";
export const LOAD_COMPLETE = "LOAD_COMPLETE";
export const SET_REDDIT_URL = "SET_REDDIT_URL";

const loading = () => ({ type: LOADING });

const loadComplete = () => ({ type: LOAD_COMPLETE });

const loginSuccess = payload => ({ type: LOGIN_SUCCESS, payload });

const setRedditUrl = payload => ({ type: SET_REDDIT_URL, payload });

const login = ({ username, password }) => dispatch => {
  dispatch(loading());
  return axiosAuth()
    .post(`${baseUrl}/auth/login`, { username, password })
    .then(res => {
      console.log(res);
      localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess(username));
    });
};

const register = ({ username, password }) => dispatch => {
  dispatch(loading());

  return axiosAuth()
    .post(`${baseUrl}/auth/register`, { username, password })
    .then(() => {
      dispatch(loadComplete());
    })
    .catch(err => console.log(err.response));
};

const getRedditUrl = () => dispatch => {
  dispatch(loading());

  return axiosAuth()
    .get(`${baseUrl}/reddit`)
    .then(res => dispatch(setRedditUrl(res.data.url)))
    .catch(err => console.error(err.response));
};

const sendRedditAuthToBackend = ({ state, code }) => dispatch => {
  dispatch(loading());

  return axiosAuth().post(`${baseUrl}/reddit/auth`, {state, code}).then(res => console.log(res));
};

export default {
  login,
  register,
  getRedditUrl,
  sendRedditAuthToBackend
};
