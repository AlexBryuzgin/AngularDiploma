import React from 'react';
import Button from './../../ui/Button';
import './pageNotFound.scss';
export default function PageNotFound(){
  return (
    <div className='not-found'>
      <h1>Страница не найдена</h1>
      <Button href='/' primary>На главную</Button>
    </div>
  );
}