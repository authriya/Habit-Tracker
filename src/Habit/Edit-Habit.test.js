import React from 'react';

import ReactDOM from 'react-dom';

import EditHabit from './Edit-Habit'

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<EditHabit/>, div);

  ReactDOM.unmountComponentAtNode(div);
});