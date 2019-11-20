import { LOGIN_SUCCESS, LOADING, SET_REDDIT_URL } from "../actions";

const initialState = {
  loggedIn: localStorage.getItem("token") ? true : false,
  loading: false,
  username: ""
};

const storageAppState = JSON.parse(localStorage.getItem("appState"));

const reducer = (
  state = storageAppState ? storageAppState : initialState,
  action
) => {
  switch (action.type) {
    case LOADING: {
      const newState = {
        ...state,
        loading: true
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }

    case LOGIN_SUCCESS: {
      const newState = {
        ...state,
        loggedIn: true,
        loading: false,
        username: action.payload
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }

    case SET_REDDIT_URL: {
      const newState = {
        ...state,
        loading: false,
        redditAuthUrl: action.payload
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
