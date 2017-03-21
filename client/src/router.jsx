import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import React from 'react';
import App from './components/App';
import MainPage from './components/MainPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

export default function AppRouter() {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={MainPage} />
        <Route path='sign-in' component={SignIn} />
        <Route path='sign-up' component={SignUp} />
      </Route>
    </Router> 
  );
}