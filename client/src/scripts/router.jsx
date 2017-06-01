import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import React from 'react';
import AdminPage from './components/admin/AdminPage';
import AdminUserInfo from './components/admin/AdminUserInfo';
import AdminUsers from './components/admin/AdminUsers';
import AppContainer from './containers/AppContainer';
import MainPage from './components/MainPage';
import PageNotFound from './components/PageNotFound';
import SignInContainer from './containers/user/signInContainer';
import SignUpContainer from './containers/user/signUpContainer';
import CreateAdvertContainer from './containers/adverts/CreateAdvertContainer';
import AdvertsContainer from './containers/adverts/AdvertsContainer';

function checkRole(nextState, replace){
  const role = localStorage.getItem('role');
  if(role !== 'admin') replace('/not-found');
}
export default function AppRouter() {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={AppContainer}>
        <IndexRoute component={MainPage} />
        <Route path='sign-in' component={SignInContainer} />
        <Route path='sign-up' component={SignUpContainer} />
        <Route path='admin' onEnter={checkRole}>
          <IndexRoute component={AdminPage} />
          <Route path='all-users' component={AdminUsers} />
          <Route path='all-users/:id' component={AdminUserInfo} />
        </Route>
        <Route path='/adverts'>
          <IndexRoute component={AdvertsContainer} />
        </Route>
        <Route path='create' component={CreateAdvertContainer} />
        <Route path="*" component={PageNotFound} />
        <Route path="not-found" component={PageNotFound} />
      </Route>
    </Router> 
  );
}