import React from 'react';
import Button from './../../ui/Button'
import AdvertsContainer from './../../containers/adverts/AdvertsContainer';
import './mainPage.scss';

export default function MainPage() {
  let linkClass = '';
  if(localStorage.getItem('role') === 'admin') {linkClass = 'admin-link'}
  else {linkClass = 'non-admin-link'}
  return (
    <div className="main">
      <h1>Bet 'n' Buy - Ваш онлайн-аукцион</h1>
      <p>
        Если вы хотите что-то купить и рассчитываете на небольшую сумму - тогда вы попали
        на нужный ресурсю У нас вы сможете найти то, что вам нужно, и даже больше.
      </p>
      <div>
        <img src="../img/VaultBoy.png" alt=""/>
      </div>
      <Button href="/adverts" primary className='main__button'>Все объявления</Button>
    </div>
  )
}