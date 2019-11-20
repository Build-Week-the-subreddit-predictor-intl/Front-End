import { LOGIN_SUCCESS, LOADING, SET_REDDIT_URL } from "../actions";

const initialState = {
  loggedIn: sessionStorage.getItem("token") ? true : false,
  loading: false,
  username: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        username: action.payload
      };

    case SET_REDDIT_URL:
      return {
        ...state,
        loading: false,
        redditAuthUrl: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
