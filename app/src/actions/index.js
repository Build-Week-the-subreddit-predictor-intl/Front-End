export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOADING = "LOADING";

const loading = () => ({ type: LOADING });

const loginSuccess = payload => ({ type: LOGIN_SUCCESS, payload });

const login = ({ username, password }) => dispatch => {
  dispatch(loading());

  dispatch(loginSuccess({ username, password }));
};

export default {
  login
};
