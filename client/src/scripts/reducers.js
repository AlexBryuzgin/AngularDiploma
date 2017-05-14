import { combineReducers } from 'redux';
import users from './containers/user/userReducers';
import adverts from './containers/adverts/advertReducers';

const rootReducer = combineReducers({
  users,
  adverts,
});
export default rootReducer;