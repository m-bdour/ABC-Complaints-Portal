import {
  combineReducers
} from 'redux';
import alert from './alert';
import auth from './auth';
import complaint from './complaint';

export default combineReducers({
  alert,
  auth,
  complaint
});