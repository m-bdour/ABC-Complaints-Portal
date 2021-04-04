import {
  GET_USERS,
  UPDATE_ROLE,
  ADMIN_ERROR
} from '../actions/types';

const initialState = {
  accounts: [],
  account: null,
  error: {}
};

function userReducer(state = initialState, action) {
  const {
    type,
    payload
  } = action;
  console.log('inter reducer');
  console.log(type);
  console.log('inter action');
  console.log(action);
  switch (type) {
    case GET_USERS:

      return {
        ...state,
        accounts: payload
      };

    case ADMIN_ERROR:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_ROLE:
      return {
        ...state,
        accounts: state.accounts.map((account) =>
        account._id === payload.id ? {
            ...account,
            role: payload.role
          } : account
        ),
      };
    default:
      return state;
  }
}

export default userReducer;