import React, { Component } from 'react'
import { ReactComponent, Counter } from '../components';
import PureComponent from '../components/PureComponent';
const Pure = PureComponent(React);
 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';

export default class App extends Component {
  render(){
    console.log(this.props);
    const { changeHeading } = this.props;
    return (
      <div>
        <h1 onClick={changeHeading}>{this.props.heading}</h1>
        <ReactComponent/>
        <Pure/>
        <Counter {...this.props}/>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    counter: state.counter,
    heading: state.heading
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
