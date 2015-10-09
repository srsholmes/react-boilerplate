let React = require('react');
let Reflux = require('reflux');
let Actions = require('../actions/actions');

let Store = Reflux.createStore({
//Set up multiple stores as triggers on this store affect
//everything listening to them.
  listenables: [Actions],

  init() {
    console.log('store init');
  }

});

module.exports = Store;
