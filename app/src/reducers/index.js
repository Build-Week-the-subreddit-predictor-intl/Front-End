import actions, {
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
  posts: [
    {
      title: "Lorem ipsum dolor sit amet",
      text:
        "Painting offers freedom. The round brush is so fun, let's go back to that. Wind this up and blend it together. I want to do something that's just a little bit different, and I think you'll find it's fun. That's one of those happy accidents.",
      id: 0
    },
    {
      title: "Lorem ipsum dolor sit amet",
      text:
        "This piece of canvas is your world. This is a very individual thing, painting is. You'll be amazed at what you can do if you'll just try. There's too many complicated things in our life already. Maybe there's a happy little tree... he lives right there.",
      id: 1
    },
    {
      title: "Lorem ipsum dolor sit amet",
      text:
        "All you do is just go back with it. This is such a super day! Dance in a happy little sky. Always start with a clean brush in a light area and work outward. That's about all we need.",
      id: 2
    },
    {
      title: "Lorem ipsum dolor sit amet",
      text:
        "The birds would get sort of crazy. You really cannot make a mistake here. Don't be afraid to go out on a limb once in a while. It's cold, but it's beautiful. The just do nice things for you.",
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
        redditAuthed: actions.payload.authed,
        redditAuthState: actions.payload.state,
        redditAuthCode: actions.payload.code,
        loading: false
      };
      localStorage.setItem("appState", JSON.stringify(newState));
      return newState;
    }

    case LOGOUT: {
      const newState = {
        ...state,
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
        posts: [...state.posts, actions.payload],
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
        posts: state.posts.includes(action.payload) ? [...state.posts] : [...state.posts, action.payload],
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
