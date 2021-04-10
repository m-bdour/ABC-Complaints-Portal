import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: true,

  user: null
};

function authReducer(state = initialState, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,

          user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,

      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
          isAuthenticated: false,

          user: null
      };
    default:
      return state;
  }
}

export default authReducer;