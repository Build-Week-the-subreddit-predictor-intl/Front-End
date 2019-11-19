import { LOGIN_SUCCESS, LOADING } from "../actions";

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

    default:
      return state;
  }
};

export default reducer;
