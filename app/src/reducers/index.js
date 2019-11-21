import {
  LOGIN_SUCCESS,
  LOADING,
  SET_REDDIT_URL,
  SET_REDDIT_AUTHED,
  LOGOUT,
  ADD_POST,
  EDIT_POST,
  DELETE,
  FETCH_POSTS,
  FETCH_SINGLE
} from "../actions";

const initialState = {
  loggedIn: localStorage.getItem("token") ? true : false,
  loading: false,
  username: "",
  posts: []
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
        redditAuth: action.payload.redditAuth,
        redditToken: action.payload.redditToken,
        redditAuthState: action.payload.redditState,
        username: action.payload.username
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

    case SET_REDDIT_AUTHED: {
      const newState = {
        ...state,
        redditAuth: action.payload.authed,
        redditAuthState: action.payload.state,
        redditAuthCode: action.payload.code,
        loading: false
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }

    case LOGOUT: {
      const newState = {
        ...initialState,
        loggedIn: false,
        loading: false
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }

    case DELETE: {
      const newState = {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        loading: false
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }

    case ADD_POST: {
      const newState = {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }

    case EDIT_POST: {
      const newState = {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.id) {
            return action.payload;
          } else return post;
        }),
        loading: false
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }

    case FETCH_POSTS: {
      const newState = {
        ...state,
        posts: action.payload,
        loading: false
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }

    case FETCH_SINGLE: {
      const newState = {
        ...state,
        posts: state.posts.includes(action.payload)
          ? [...state.posts]
          : [...state.posts, action.payload],
        loading: false
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
