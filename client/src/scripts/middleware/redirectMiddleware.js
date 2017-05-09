import { browserHistory } from 'react-router';

export default ({ dispatch }) => next => (action) => {
  if (!action.redirect) {
    return next(action);
  }

  const { redirect, ...rest } = action;
  dispatch(rest);
  const url = typeof redirect === 'function'
    ? redirect(rest)
    : redirect;
  return browserHistory.push(url);
};
