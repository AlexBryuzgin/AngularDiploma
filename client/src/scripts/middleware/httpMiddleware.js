export default client => ({ dispatch, getState }) => next => (action) => {
  if (typeof action === 'function') {
    console.warn('The use of action as a function is deprecated. Please use another way');
    return action(dispatch, getState);
  }

  const { type, http, ...rest } = action;
  if (!http) {
    return next(action);
  }
  dispatch({ type: `${type}__REQUEST` });

  return http(client)
    .then(response => response.json())
    .then(json => ({
      ...rest,
      type,
      payload: json,
      receivedAt: Date.now(),
    })
    )
    .then((info) => {
      dispatch(info);
      return info.payload;
    })

    .catch(error => dispatch({ type: `${type}__FAIL`, error }));
};
