import React from 'react';
import { Link, browserHistory } from 'react-router';
import { DropdownMenu, DropdownMenuItem } from './../../../ui/DropdownMenu';
import './userBar.scss';

export default class UserBar extends React.Component {
  constructor(props) {
    super(props);
    this.renderSignIn = this.renderSignIn.bind(this);
    this.renderUserList = this.renderUserList.bind(this);
    this.onAdminPage = this.onAdminPage.bind(this);
  }

  compoentDidMount() {
    console.log(this.props.userEmail);
  }
  renderSignIn() {
    return (
      <div className='links_login'>
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
    );  
  }

  onAdminPage() {
    if (this.props.role === 'admin') {
      return (
        <DropdownMenuItem onClick={() => browserHistory.push('/admin')}>
          Admin Page
        </DropdownMenuItem>
      )
    }
    return null;
  }

  renderUserList() {
    return (
      <DropdownMenu title={this.props.username} className='links_dropdown'>
        <DropdownMenuItem onClick={this.props.signOut}>
          Sign Out
        </DropdownMenuItem>
        <DropdownMenuItem>
          Profile
        </DropdownMenuItem>
        {this.onAdminPage()}
      </DropdownMenu>
    );
  }

  render() {
    console.log(this.props.userEmail);
    return (
      <div className="header__links">
        {this.props.username ? this.renderUserList() : this.renderSignIn()}
      </div>
    );
  }
} 