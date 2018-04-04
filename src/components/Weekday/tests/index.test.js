import React from 'react';
import ReactDOM from 'react-dom';
import Weekday from '../index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Weekday />, div);
  ReactDOM.unmountComponentAtNode(div);
});
