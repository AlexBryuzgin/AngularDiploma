import { combineReducers } from 'redux';
import users from './containers/user/userReducers';

const rootReducer = combineReducers({
  users,
});
export default rootReducer;