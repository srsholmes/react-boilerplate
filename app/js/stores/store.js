let React = require('react');
let Reflux = require('reflux');
let Actions = require('../actions/actions');

import { LOCAL_STORAGE_KEY } from '../constants/constants';


let Store = Reflux.createStore({
  listenables: [Actions],

  init() {
    this.contents = {
			opener: 'Hello Boilerplate',
      dataValid: true
    };
    this._setupLocalStorage();
  },

  onHeadingClick() {
    this.contents.opener = 'Heading coming from store';
    this.trigger(this.contents);
  },

  _setupLocalStorage() {
    let localStorageItem = localStorage.getItem(LOCAL_STORAGE_KEY);
    localStorageItem === null || JSON.parse(localStorageItem).dataValid !== true ? localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.contents)) : this.contents = JSON.parse(localStorageItem);
  },

  _updateLocalStorage(obj) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(obj));
  },

  getInitialState() {
  	return this.contents;
  }

});

module.exports = Store;
