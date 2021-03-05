import React from 'react';
import {DatePicker} from 'antd';

import history from '../../data/history.json';
import {highlight} from '../highlight';
import symbols from '../symbols';

class App extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      highlighted: [],
    };
  }

  display() {
    if (this.state.startDate === '' || this.state.endDate === '') {
      return;
    }
    this.setState({
      highlighted: highlight(history, {
        symbols,
        startDate: this.state.startDate.replace(/-/g, ''),
        endDate: this.state.endDate.replace(/-/g, ''),
        take: 100,
        minMoneyAmount: 50000000000, // 50 billion
      }),
    });
  }

  render() {
    return (
      <>
        <DatePicker
          onChange={(date, dateString) => {
            this.setState({startDate: dateString}, () => {
              this.display();
            });
          }}
        />
        <DatePicker
          onChange={(date, dateString) => {
            this.setState({endDate: dateString}, () => {
              this.display();
            });
          }}
        />
        <pre>
          <code>{JSON.stringify(this.state.highlighted, null, 2)}</code>
        </pre>
      </>
    );
  }
}

export default App;
