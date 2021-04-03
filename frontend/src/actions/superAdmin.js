import api from '../utils/api';
import {
    setAlert
} from './alert';

import {
    GET_USERS,
    UPDATE_ROLE,
    ADMIN_ERROR
} from './types';


// Get users
export const getusers = () => async dispatch => {
    try {
        const res = await api.get('/admin');

        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Update role
export const updaterole = (id, role) => async dispatch => {
    try {
        const res = await api.put(`/complaint/${role}/${id}`);

        dispatch({
            type: UPDATE_ROLE,
            payload: res.data

        });
        dispatch(setAlert('role updated', 'success'));
    } catch (err) {
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};