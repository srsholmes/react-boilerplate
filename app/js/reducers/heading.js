import { CLICK_HEADING } from '../actions/actions';

export default function heading(state = 'React Boilerplate. Click me.', action) {
  switch (action.type) {
  case CLICK_HEADING:
    return 'You clicked the heading';
  default:
    return state;
  }
}
