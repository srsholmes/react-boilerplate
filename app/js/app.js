require('babelify/polyfill');
import 'whatwg-fetch';

let React = require('react');
let ReactDOM = require('react-dom');
//Needed for React Developer Tools
window.React = React;

import { App } from './components';

ReactDOM.render(<App/>, document.querySelector('div[app]'));
