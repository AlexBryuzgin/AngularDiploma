import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import httpMiddleware from './middleware/httpMiddleware';
import redirectMiddleware from './middleware/redirectMiddleware';
import rootReducer from './reducers';

import HttpClient from './HttpClient';

const httpClient = new HttpClient({ baseURL: 'http://localhost:8080/' });

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      httpMiddleware(httpClient),
      redirectMiddleware,
      loggerMiddleware
    )
  );
}

