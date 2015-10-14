// let React = require('react');
// let Reflux = require('reflux');
// let Actions = require('../actions/actions');

import React from 'react';
import Reflux from 'reflux';
import Actions from '../actions/actions';

//Stores
import Store from '../stores/store';

import { Component } from './';

let App = React.createClass({

  mixins: [
    Reflux.connect(Store)
  ],

  onClick() {
    Actions.headingClick();
  },

  render(){
    return (
      <div>
        <h1 onClick={this.onClick}>{this.state.opener}</h1>
        <Component/>
        <h2>How are you today?</h2>
      </div>
    )
  }
});

export default App;
