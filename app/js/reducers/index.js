import { combineReducers } from 'redux';
import counter from './counter';
import heading from './heading';
const rootReducer = combineReducers({
  counter,
  heading
});

export default rootReducer;
