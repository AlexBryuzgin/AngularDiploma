import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import React from 'react';
import AdminPage from './components/admin/AdminPage';
import AdminUserInfo from './components/admin/AdminUserInfo';
import AdminUsers from './components/admin/AdminUsers';
import App from './components/App';
import MainPage from './components/MainPage';
import PageNotFound from './components/PageNotFound';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function checkRole(nextState, replace){
  const role = localStorage.getItem('role');
  if(role !== 'admin') replace('/not-found');
}
export default function AppRouter() {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={MainPage} />
        <Route path='sign-in' component={SignIn} />
        <Route path='sign-up' component={SignUp} />
        <Route path='admin' onEnter={checkRole}>
          <IndexRoute component={AdminPage} />
          <Route path='all-users' component={AdminUsers} />
          <Route path='all-users/:id' component={AdminUserInfo} />
        </Route>
        <Route path="*" component={PageNotFound} />
        <Route path="not-found" component={PageNotFound} />
      </Route>
    </Router> 
  );
}