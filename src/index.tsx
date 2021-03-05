import './index.css';

import ReactDOM from 'react-dom';
import React from 'react';

class Main extends React.Component {
  render() {
    return 'Hello world!';
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<Main />, container);
