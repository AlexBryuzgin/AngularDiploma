import React from 'react';
import { Link } from 'react-router';
import './header.scss';

export default function Header() {
  return (
    <header className='header'>
      <Link className="header__logo" to='/'>My Project</Link>
      <div className="header__links">
        <Link
          className='links__sign-up-link'
          to='/sign-up'
          activeClassName='header__links_active'
        >
          Регистрация
        </Link>
        <Link
          className='links__sign-in-link'
          to='/sign-in'
          activeClassName='header__links_active'
        >
          Вход
        </Link>
      </div>
    </header>
  );
}