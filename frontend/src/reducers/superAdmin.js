import {
  GET_USERS,
  UPDATE_ROLE,
  ADMIN_ERROR
} from '../actions/types';

const initialState = {
  users: [],
  user: null,
  error: {}
};

function userReducer(state = initialState, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        complaints: payload
      };

    case ADMIN_ERROR:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_ROLE:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === payload.id ? {
            ...user,
            role: payload.role
          } : user
        ),
      };
    default:
      return state;
  }
}

export default userReducer;