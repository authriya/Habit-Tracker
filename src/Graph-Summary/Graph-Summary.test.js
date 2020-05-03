import React from 'react';

import ReactDOM from 'react-dom';

import GraphSummary from './Graph-Summary'

import {BrowserRouter} from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><GraphSummary/></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});