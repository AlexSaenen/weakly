import React from 'react';
import ReactDOM from 'react-dom';
import HourLabels from '../index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HourLabels />, div);
  ReactDOM.unmountComponentAtNode(div);
});
