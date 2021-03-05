import React from 'react';

import history from '../../data/history.json';
import {highlight} from '../highlight';
import symbols from '../symbols';

const highlighted = highlight(history, {
  symbols,
  startDate: '20210219',
  endDate: '20210305',
  take: 100,
  minMoneyAmount: 50000000000, // 50 billion
});

class App extends React.Component {
  render() {
    return (
      <pre>
        <code>{JSON.stringify(highlighted, null, 2)}</code>
      </pre>
    );
  }
}

export default App;
