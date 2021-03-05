import './index.css';

import ReactDOM from 'react-dom';
import React from 'react';

import App from './main';

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App />, container);
