import {
  SET_ERROR,
  LOGIN_USER,
  LOGOUT_USER,
  SET_CURRENT_USER
} from "../action/actionTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true
      };

    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
