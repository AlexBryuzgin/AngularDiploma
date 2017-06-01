import React from 'react';
import Header from './../Header';
import logo from './../../../logo.svg';
import './App.scss';

export default class App extends React.Component {
  componentDidMount() {
    this.props.checkLogin();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}