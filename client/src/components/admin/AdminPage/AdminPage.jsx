import React from 'react';
import { Link } from 'react-router';
import './adminPage.css';

export default function AdminPage(){
  return (
    <div className='admin-page'>
      <Link to='/admin/all-users'>Просмотреть пользователей</Link>
    </div>
  );
}