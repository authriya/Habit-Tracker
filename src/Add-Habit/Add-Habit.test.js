import React from 'react';

import ReactDOM from 'react-dom';

import AddHabit from './Add-Habit'

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<AddHabit/>, div);

  ReactDOM.unmountComponentAtNode(div);
});