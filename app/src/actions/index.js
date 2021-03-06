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
export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_SINGLE = "FETCH_SINGLE";

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
  localStorage.removeItem("token");
};

const setPosts = payload => ({ type: FETCH_POSTS, payload });

const getSinglePost = payload => ({ type: FETCH_SINGLE, payload });

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
    .catch(err => console.error(err.response));
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
    .delete(`${baseUrl}/posts/${id}`)
    .then(() => dispatch(deletePost(id)))
    .catch(err => console.error(err));
};

const getRecommendedSubreddit = ({ title, text }) => dispatch => {
  dispatch(loading());

  return axiosAuth()
    .post(`${baseUrl}/posts`, {
      title,
      text
    })
    .then(res => {
      dispatch(addPost(res.data));
    })
    .catch(err => console.error(err));
};

const editPostDraft = postData => dispatch => {
  dispatch(loading());

  const post = {};
  if (postData.title) post.title = postData.title;
  if (postData.text) post.text = postData.text;

  return axiosAuth()
    .put(`${baseUrl}/posts/${postData.id}`, post)
    .then(res => {
      dispatch(editPost(res.data));
    })
    .catch(err => console.error(err));
};

const postToReddit = ({ title, text, state, subreddit, id }) => dispatch => {
  return axiosAuth()
    .post(`${baseUrl}/posts/reddit`, {
      title,
      text,
      state,
      subreddit
    })
    .then(res => {
      dispatch(postToRedditSuccess(id, title, text, res.data.name));
      window.open(`https://www.reddit.com/r/${subreddit}`, "_blank");
    })
    .catch(err => console.error(err));
};

const fetchPosts = () => dispatch => {
  return axiosAuth()
    .get(`${baseUrl}/posts`)
    .then(response => {
      dispatch(setPosts(response.data));
    })
    .catch(error => console.error(error));
};

const fetchSingle = id => dispatch => {
  return axiosAuth()
    .get(`${baseUrl}/posts/${id}`)
    .then(response => {
      dispatch(getSinglePost(response.data));
    })
    .catch(error => console.error(error));
};

const postToRedditSuccess = (id, title, text, flair_text) => dispatch => {
  return axiosAuth()
    .put(`${baseUrl}/posts/${id}`, { title, text, flair_text })
    .then(res => {
      dispatch(fetchPosts());
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
  postToReddit,
  fetchPosts,
  fetchSingle
};
