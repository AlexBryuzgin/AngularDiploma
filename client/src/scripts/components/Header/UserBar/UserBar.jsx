import React from 'react';
import { Link } from 'react-router';
import { DropdownMenu, DropdownMenuItem } from './../../../ui/DropdownMenu';
import Button from './../../../ui/Button';
import Icon from './../../../ui/Icon';
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
        <DropdownMenuItem>
          <Link to="/admin">Админ</Link>
        </DropdownMenuItem>
      )
    }
    return null;
  }

  renderUserList() {
    return (
      <div className='links__userbar'>
        <Button primary className='userbar__button'>
          <Icon icon='plus-square-o' />
          Создать объявление
        </Button>
        <DropdownMenu title={this.props.username} className='links_dropdown'>
          <DropdownMenuItem>
            <Link to="/profile">Профиль</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/favorites">Избранное</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={this.props.signOut}>
            Выход
          </DropdownMenuItem>
          {this.onAdminPage()}
        </DropdownMenu>
      </div>
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