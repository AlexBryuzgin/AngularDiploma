import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import HttpClient from './../../HttpClient.js';
import './signUp.scss';

const client = new HttpClient();

export default class SignUp extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      role: 'user',
      confirmPassword: '',
    };
    this.inputData = [
      {
        type: 'text',
        placeholder: 'Введите свой никнейм',
        common: 'username',
      },
      {
        type: 'email',
        placeholder: 'Введите правильный e-mail',
        common: 'email',
      },
      {
        type: 'password',
        placeholder: 'Введите пароль',
        common: 'password',
      },
      {
        type: 'password',
        placeholder: 'Подтвердите пароль',
        common: 'confirmPassword',
      },
    ];
    this.renderInputs = this.renderInputs.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  renderInputs(inputs){
    return inputs.map(value => (
      <div
        className="form__field"
        key={value.common}  
      >
        <input
          noValidate
          type={value.type}
          value={this.state[value.common]}
          name={value.common}
          placeholder={value.placeholder}
          onChange={this.handleInputChange}
        />
      </div>
    ), this);
  }

  handleInputChange(event){
    const value = event.target.value;
    this.setState({
      [event.target.name]: value,
    });
  }

  onHandleSubmit(event){
    event.preventDefault();
    this.props.signUp(this.state);
    // browserHistory.push('/sign-in');
  }

  render(){
    return (
      <div className="sign-up">
        <h1 className="sign-up__header">Регистрация</h1>
        <p className="sign-up__info">
          Заполните все поля корректно, чтобы зарегистрироваться
        </p>
        <form 
          className='sign-up__form'
          onSubmit={this.onHandleSubmit}
        >
          {this.renderInputs(this.inputData)}
          <button className='form__submit'>Зарегистрироваться</button>
        </form>
      </div>
    );
  }
}