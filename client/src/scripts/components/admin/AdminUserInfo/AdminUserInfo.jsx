import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import HttpClient from './../../../HttpClient';
import Button from './../../../ui/Button';
import './adminUsersInfo.scss';

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
      [event.target.id]: value || '',
    });
    console.log(this.state);
  }
  getUser(id){
    client.get(`/users/admin-page/${id}`)
      .then(user => user.json())
      .then(json => {
        const nonRender = ['created_at', 'updated_at', 'password'];
        let renderObj = {};
        Object.keys(json).map(key => {
          if(!nonRender.includes(key)){
            Object.assign(renderObj, {
              [key]: json[key] || ''
            })
          }
        });
        this.setState({
          ...renderObj
        })
      })
      .catch(err => console.log(err))
  }
  deleteUser(){
    client.delete(`/users/admin-page/${this.props.params.id}`)
    .then(() => browserHistory.push('/admin'))
    .catch(err => console.log(err))
  }

  changeData(event){
    event.preventDefault();
    console.log(this.state);
    const data = this.state;
    client.put(`/users/admin-page/${this.props.params.id}`, {
      body: JSON.stringify(data),
    })
    .then(() => {
      this.getUser(this.props.params.id);
    })
    .catch(err => console.log(err));
  }

  render(){
    const info = Object.keys(this.state).map(key => {
      return (
        <div className='table-row' key={key}>
          <div className="table-cell">
            <span>{key}</span>
          </div>
          <div className="table-cell">
            <input
              type="text"
              value={this.state[key]}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
      );
    });
    return (
      <div className='admin-user'>
        <form onSubmit={this.changeData}>
          <div className="table">
            {info}
          </div>
          <div className="buttons">
            <Button type="button" primary onClick={this.deleteUser} className='admin__button'>Удалить</Button>
            <Button primary className='admin__button'>Сохранить изменения</Button>
          </div>
        </form>
      </div>
    );
  }
}