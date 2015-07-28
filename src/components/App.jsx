let React = require('react');
let Reflux = require('reflux');
let Actions = require('../actions/actions');

//Stores
let Store = require('../stores/store');

let App = React.createClass({

  mixins: [
    Reflux.connect(Store)
  ],

  render(){
    return (
      <div>
        <h1>Hello Boilerplate</h1>
      </div>
    )
  }
});

export default App;
