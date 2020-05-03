import React from 'react';

import ReactDOM from 'react-dom';

import HabitPage from './Habit-Page'

import {BrowserRouter} from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><HabitPage/></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});