import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import React from 'react';
import App from './components/App';
import MainPage from './components/MainPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AdminPage from './components/admin/AdminPage';
import AdminUsers from './components/admin/AdminUsers';
import AdminUserInfo from './components/admin/AdminUserInfo';

export default function AppRouter() {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={MainPage} />
        <Route path='sign-in' component={SignIn} />
        <Route path='sign-up' component={SignUp} />
        <Route path='admin'>
          <IndexRoute component={AdminPage} />
          <Route path='all-users' component={AdminUsers} />
          <Route path='all-users/:id' component={AdminUserInfo} />
        </Route>
      </Route>
    </Router> 
  );
}