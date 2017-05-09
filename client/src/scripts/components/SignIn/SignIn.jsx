import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './signIn.scss';

export default class SignUp extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.inputData = [
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
    this.props.signIn(this.state);
  }

  render(){
    return (
      <div className="sign-in">
        <h1 className="sign-in__header">Авторизация</h1>
        <p className="sign-in__info">
          Заполните все поля корректно, чтобы авторизироваться
        </p>
        <form 
          className='sign-in__form'
          onSubmit={this.onHandleSubmit}
        >
          {this.renderInputs(this.inputData)}
          <button className='form__submit'>Войти</button>
        </form>
      </div>
    );
  }
}