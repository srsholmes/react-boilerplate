let React = require('react');
let Reflux = require('reflux');
let Actions = require('../actions/actions');

//Stores
let Store = require('../stores/store');

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
      </div>
    )
  }
});

export default App;
