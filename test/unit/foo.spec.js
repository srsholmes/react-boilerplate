import React from 'react';
import {mount} from 'enzyme';
import Foo from '../../app/js/components/Foo';
import test from "tape"

test('Foo Component', t => {
  t.plan(1);
  let component = mount(<Foo/>);
  t.ok(component.contains(<div className="foo"/>), 'It should render the Foo component');
});
