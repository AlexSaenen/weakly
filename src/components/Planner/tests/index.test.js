import React from 'react';
import ReactDOM from 'react-dom';
import Planner from '../index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Planner />, div);
  ReactDOM.unmountComponentAtNode(div);
});
