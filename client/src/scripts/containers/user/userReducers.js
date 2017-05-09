import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  CHECK_LOGIN,
} from './userActions.js';
import createReducer from './../../utils/reduxUtils';

const initialState = {
  isFetching: false,
  user: null,
  error: null,
}

function requestSignIn(state) {
  return {
    ...state,
    isFetching: true,
  }
}
function userSignIn(state, action) {
  if(action.payload.success) {
    localStorage.setItem('ACCESS_TOKEN', action.payload.token);
    localStorage.setItem('role', action.payload.user.role);
    return {
      ...state,
      user: {
        ...action.payload.user,
      },
      error: null,
      isFetching: false,
    }
  };
  return {
    ...state,
    error: action.payload.error,
  }
}

function requestSignUp(state) {
  return {
    ...state,
    isFetching: true,
  }
}
function userSignUp(state, action) {
  if(action.payload.success) {
    return {
      ...state,
      user: {
        ...action.payload.user,
      },
      isFetching: false,
    }
  };
  return {
    ...state,
    error: action.payload.error,
  }
}

function userSignOut(state) {
  localStorage.removeItem('ACCESS_TOKEN');
  localStorage.removeItem('role');
  return {
    ...state,
    user: null,
    isFetching: false,
  };
}

function checkLogin(state, action) {
  return {
    ...state,
    user: {
      ...action.payload.user,
    },
    error: null,
    isFetching: false,
  }
}

const user = createReducer(initialState, {
  [`${SIGN_IN}_REQUEST`]: requestSignIn,
  [SIGN_IN]: userSignIn,
  [SIGN_OUT]: userSignOut,
  [SIGN_UP]: userSignUp,
  [`${SIGN_UP}_REQUEST`]: requestSignUp,
  [CHECK_LOGIN]: checkLogin,
});

export default user;