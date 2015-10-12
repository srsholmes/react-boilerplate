require('babelify/polyfill');
import 'whatwg-fetch';

let React = require('react-dom');

//Needed for React Developer Tools
window.React = React;

import { App } from './components';

React.render(<App/>, document.querySelector('div[app]'));
