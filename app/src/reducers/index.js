import { LOGIN_SUCCESS } from "../actions";

const initialState = { loggedIn: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true
      };

    default:
      return state;
  }
};

export default reducer;
