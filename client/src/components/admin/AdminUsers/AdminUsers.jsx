import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import HttpClient from './../../../HttpClient';
import './adminUsers.css';

const client = new HttpClient();

export default class AdminUsers extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
    }
    this.getUsers();
    this.getUsers = this.getUsers.bind(this);
    this.goToUser = this.goToUser.bind(this);
  }
  getUsers(){
    client.get('/api/users/admin-page')
    .then(users => users.json())
    .then(json => {
      this.setState({
        users: json,
      });
    })
    .catch(err => console.log(err));
  }
  goToUser(id){
    browserHistory.push(`/admin/all-users/${id}`)
  }
  render(){
    const users = this.state.users.map(user => {
      return (
        <tr key={user.id} onClick={() => this.goToUser(user.id)}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users}
        </tbody>
      </table>
    );
  }
}