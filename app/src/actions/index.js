import axiosAuth from "../utils/axiosAuth";
import { useSelector } from "react-redux";

const baseUrl = `https://subreddit-predictor.herokuapp.com/api`;

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOADING = "LOADING";
export const LOAD_COMPLETE = "LOAD_COMPLETE";
export const SET_REDDIT_URL = "SET_REDDIT_URL";
export const SET_REDDIT_AUTHED = "SET_REDDIT_AUTHED";
export const DELETE = "DELETE";
export const POST_TO_REDDIT = "POST_TO_REDDIT";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";

const loading = () => ({ type: LOADING });

const loadComplete = () => ({ type: LOAD_COMPLETE });

const loginSuccess = payload => ({ type: LOGIN_SUCCESS, payload });

const setRedditUrl = payload => ({ type: SET_REDDIT_URL, payload });

const setRedditAuthed = payload => ({ type: SET_REDDIT_AUTHED, payload });

const deletePost = payload => ({ type: DELETE, payload });

const postedToReddit = payload => ({ type: POST_TO_REDDIT, payload });

const addPost = payload => ({ type: ADD_POST, payload });

const editPost = payload => ({ type: EDIT_POST, payload });

const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

const login = ({ username, password }) => dispatch => {
  dispatch(loading());
  return axiosAuth()
    .post(`${baseUrl}/auth/login`, { username, password })
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess({ ...res.data, username }));
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

  return axiosAuth()
    .post(`${baseUrl}/reddit/auth`, { state, code })
    .then(res =>
      dispatch(
        setRedditAuthed({
          authed: res.data.authorized,
          redditAuthState: state,
          redditAuthCode: code
        })
      )
    )
    .catch(err => console.error(err));
};

const deleteById = id => dispatch => {
  return axiosAuth()
    .delete(`${baseUrl}/api/posts/${id}`)
    .then(() => dispatch(deletePost(id)))
    .catch(err => console.error(err));
};

const getRecommendedSubreddit = ({ title, body }) => dispatch => {
  dispatch(loading());

  return axiosAuth()
    .post(`${baseUrl}/api/posts`, {
      title,
      body
    })
    .then(res => {
      console.log(res);
      dispatch(
        addPost({ title: res.data.title, body: res.data.body, id: res.data.id })
      );
    })
    .catch(err => console.error(err));
};

const editPostDraft = postData => dispatch => {
  dispatch(loading());

  const post = {};
  if (postData.title) post.title = postData.title;
  if (postData.body) post.body = postData.body;

  return axiosAuth()
    .put(`${baseUrl}/api/posts/${postData.id}`, post)
    .then(res => {
      console.log(res);
      dispatch(editPost(res.data));
    })
    .catch(err => console.error(err));
};

const postToReddit = ({ title, body, subreddit }) => dispatch => {
  //need a way to display that the post was submitted to reddit. Maybe disable
  //submit to reddit button
  const redditAuthState = useSelector(state => state.redditAuthState);
  // dispatch(loading());
  return axiosAuth()
    .post(`${baseUrl}/api/posts/reddit`, {
      title,
      body,
      state: redditAuthState,
      subreddit
    })
    .then(res => {
      console.log(res);
      dispatch(postedToReddit(res.data));
    })
    .catch(err => console.error(err));
};

export default {
  login,
  logout,
  register,
  getRedditUrl,
  getRecommendedSubreddit,
  sendRedditAuthToBackend,
  deleteById,
  editPostDraft,
  postToReddit
};
