import {
  ADD_COMPLAINT,
  GET_COMPLAINTS,
  GET_COMPLAINT,
  COMPLAINT_ERROR,
  UPDATE_COMPLAINT,
  DELETE_COMPLAINT
} from '../actions/types';

const initialState = {
  complaints: [],
  complaint: null,
  error: {}
};

function complaintReducer(state = initialState, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case GET_COMPLAINTS:
      return {
        ...state,
        complaints: payload
      };
    case GET_COMPLAINT:
      return {
        ...state,
        complaints: payload,
      };
    case ADD_COMPLAINT:
      return {
        ...state,
        complaints: [payload, ...state.complaints],
      };
    case DELETE_COMPLAINT:
      return {
        ...state,
        complaints: state.complaints.filter((complaint) => complaint._id !== payload),
      };
    case COMPLAINT_ERROR:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_COMPLAINT:
      return {
        ...state,
        complaints: state.complaints.map((complaint) =>
          complaint._id === payload.id ? {
            ...complaint,
            status: payload.status,
            notes: payload.notes
          } : complaint
        ),
      };
    default:
      return state;
  }
}

export default complaintReducer;