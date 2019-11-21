import actions, {
  LOGIN_SUCCESS,
  LOADING,
  SET_REDDIT_URL,
  SET_REDDIT_AUTHED,
  LOGOUT
} from "../actions";

const initialState = {
  loggedIn: localStorage.getItem("token") ? true : false,
  loading: false,
  username: "",
  posts: [
    {
      title: "Lorem ipsum dolor sit amet",
      text:
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ",
      id: 0
    },
    {
      title: "Lorem ipsum dolor sit amet",
      text:
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ",
      id: 1
    },
    {
      title: "Lorem ipsum dolor sit amet",
      text:
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ",
      id: 2
    },
    {
      title: "Lorem ipsum dolor sit amet",
      text:
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ",
      id: 3
    },
    {
      title: "Lorem ipsum dolor sit amet",
      text:
        "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ",
      id: 4
    }
  ]
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
      console.log("authed", actions.payload);
      const newState = {
        ...state,
        redditAuthed: actions.payload
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }

    case LOGOUT: {
      const newState = {
        ...state,
        loggedIn: false
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
