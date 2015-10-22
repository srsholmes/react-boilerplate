import React from 'react';

//Normal Components
import { Component, Counter } from '../components';

//Pure Components
import PureComponent from '../components/PureComponent';
const Pure = PureComponent(React);

//The redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';


let App = React.createClass({
  render(){

    console.log(this.props);
    const { changeHeading } = this.props;

    return (
      <div>
        <h1 onClick={changeHeading}>{this.props.heading}</h1>
        <Component/>
        <Pure/>
        <Counter {...this.props}/>
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
    counter: state.counter,
    heading: state.heading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
