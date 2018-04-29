import React from 'react';
import ReactDOM from 'react-dom';
import Task from '../index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Task />, div);
  ReactDOM.unmountComponentAtNode(div);
});
