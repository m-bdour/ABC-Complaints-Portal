import api from '../utils/api';
import {
  setAlert
} from './alert';

import {
  ADD_COMPLAINT,
  GET_COMPLAINTS,
  GET_COMPLAINT,
  COMPLAINT_ERROR,
  UPDATE_COMPLAINT,
  DELETE_COMPLAINT
} from './types';

// Get complaints
export const getComplaints = () => async dispatch => {
  try {
    const res = await api.get('/complaint/all');

    dispatch({
      type: GET_COMPLAINTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMPLAINT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Update complaint
export const updateComplaint = (id, formData) => async dispatch => {
  try {
    const res = await api.put(`/complaint/update/${id}`, formData);

    dispatch({
      type: UPDATE_COMPLAINT,
      payload: res.data

    });
    dispatch(setAlert('Complaint updated', 'success'));
  } catch (err) {
    dispatch({
      type: COMPLAINT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Delete complaint
export const deleteComplaint = id => async dispatch => {
  try {
    await api.delete(`/complaint/${id}`);

    dispatch({
      type: DELETE_COMPLAINT,
      payload: id
    });

    dispatch(setAlert('Complaint Removed', 'success'));
  } catch (err) {
    dispatch({
      type: COMPLAINT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Add complaint
export const addComplaint = formData => async dispatch => {
  try {
    const res = await api.post('/complaint', formData);

    dispatch({
      type: ADD_COMPLAINT,
      payload: res.data
    });

    dispatch(setAlert('Complaint Created', 'success'));
  } catch (err) {
    dispatch({
      type: COMPLAINT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Get user complaints
export const getComplaint = () => async dispatch => {
  try {
    const res = await api.get('/complaint');

    dispatch({
      type: GET_COMPLAINT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMPLAINT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};