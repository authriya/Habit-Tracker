import React from 'react';

import ReactDOM from 'react-dom';

import LogHabit from './Log-Habit'

import {BrowserRouter} from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><LogHabit/></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});