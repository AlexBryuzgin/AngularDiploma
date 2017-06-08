import React from 'react';
import Button from './../../ui/Button';

import './profile.scss';

const fields = ['Имя пользователя', 'Email', 'Страна', 'Город', 'Адрес', 'Контакты'];

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.renderFields = this.renderFields.bind(this);
  }

  renderFields() {
    return fields.map((field) => {
      return (
        <div className="table-row">
          <div className="table-cell">
            <span>{field}</span>
          </div>
          <div className="table-cell">
            <input type="text"/>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="profile">
        <h2 className="profile__title">Страница профиля</h2>
        <p className="profile__description">
          На данной странице вы можете изменить данные своей учётной записи
        </p>
        <div className="table">
          {this.renderFields()}
        </div>
        <Button primary className='profile__save'>Сохранить изменения</Button>
      </div>
    )
  }
}