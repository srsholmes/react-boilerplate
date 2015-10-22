import React from 'react';

//Normal Components
import { Component, Counter } from '../components';

//Pure Components
import PureComponent from '../components/PureComponent';
const Pure = PureComponent(React);

//The redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../actions/counter';


let App = React.createClass({
  render(){
    return (
      <div>
        <h3>React Boilerplate</h3>
        <Component/>
        <Pure/>
        <Counter {...this.props}/>
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
