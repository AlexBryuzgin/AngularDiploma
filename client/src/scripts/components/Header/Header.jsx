import React from 'react';
import { Link } from 'react-router';
import UserBarContainer from './../../containers/user/userBarContainer';
import './header.scss';

export default function Header() {
  return (
    <header className='header'>
      <div className="header__container">
        <Link className="header__logo" to='/'>My Project</Link>
        <UserBarContainer />
      </div>
    </header>
  );
}