import React from 'react';
import { Link } from 'react-router';
export default function PageNotFound(){
  return (
    <div>
      <h1>Страница не найдена</h1>
      <Link to='/'>На главную</Link>
    </div>
  );
}