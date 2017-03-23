import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import HttpClient from './../../../HttpClient';
import './adminUsersInfo.css';

const client = new HttpClient();

export default class AdminUserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.getUser = this.getUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.changeData = this.changeData.bind(this);
    this.getUser(this.props.params.id)
  }
  handleInputChange(event) {
    const value = event.target.value;
    this.setState({
      [event.target.id]: value,
    });
    console.log(this.state);
  }
  getUser(id){
    client.get(`/api/users/admin-page/${id}`)
      .then(user => user.json())
      .then(json => {
        // HARDCODE
        const nonRender = ['createdAt', 'updatedAt', 'id'];
        this.setState({
          username: json.username,
          email: json.email,
          password: json.password,
          role: json.role,
        })
      })
      .catch(err => console.log(err))
  }
  deleteUser(){
    client.delete(`/api/users/admin-page/${this.props.params.id}`)
    .then(() => browserHistory.push('/admin/all-users'))
    .catch(err => console.log(err))
  }

  changeData(event){
    event.preventDefault();
    console.log(this.state);
    const data = this.state;
    client.put(`/api/users/admin-page/${this.props.params.id}`, {
      body: JSON.stringify(data),
    })
    .then(() => {
      this.getUser(this.props.params.id);
      // browserHistory.push('/admin/all-users');
    })
    .catch(err => console.log(err));
  }

  render(){
    const info = Object.keys(this.state).map(key => {
      const nonRender = ['createdAt', 'updatedAt', 'id'];
      if(!nonRender.includes(key)){
        return (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              type="text"
              id={key}
              value={this.state[key]}
              onChange={this.handleInputChange}
            />
          </div>
        );
      }
    })
    return (
      <div>
        <form onSubmit={this.changeData}>
          {info}
          <button type="button" onClick={this.deleteUser}>Удалить</button>
          <button>Сохранить изменения</button>
        </form>
      </div>
    );
  }
}