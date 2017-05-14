import React from 'react';
import { Link } from 'react-router';
import AdvertsContainer from './../../containers/adverts/AdvertsContainer';
import './mainPage.scss';

export default function MainPage() {
  let linkClass = '';
  if(localStorage.getItem('role') === 'admin') {linkClass = 'admin-link'}
  else {linkClass = 'non-admin-link'}
  return (
    <div className="main">
      <h1>Main Page</h1>
      <AdvertsContainer />
      <Link to="/admin" className={linkClass}>На страницу админа</Link>
    </div>
  )
}