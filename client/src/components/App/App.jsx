import React from 'react';
import Header from './../Header';
import logo from './../../logo.svg';
import './App.css';

export default function App(props) {
  return (
    <div className="App">
      <Header />
      {props.children}
    </div>
  );
}