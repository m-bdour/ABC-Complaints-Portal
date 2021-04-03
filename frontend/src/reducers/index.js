import {
  combineReducers
} from 'redux';
import alert from './alert';
import auth from './auth';
import complaint from './complaint';
import superAdmin from './superAdmin';

export default combineReducers({
  alert,
  auth,
  complaint,
  superAdmin
});