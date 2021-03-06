import React from 'react';
import {DatePicker, Slider} from 'antd';

import history from '../../data/history.json';
import {highlight} from '../highlight';
import symbols from '../symbols';

class App extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      minTransaction: 0,
      maxTransaction: 1000,
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
        minTransaction: this.state.minTransaction * 1000000000,
        maxTransaction: this.state.maxTransaction * 1000000000,
      }),
    });
  }

  render() {
    return (
      <>
        From{' '}
        <DatePicker
          onChange={(date, dateString) => {
            this.setState({startDate: dateString}, () => {
              this.display();
            });
          }}
        />{' '}
        to{' '}
        <DatePicker
          onChange={(date, dateString) => {
            this.setState({endDate: dateString}, () => {
              this.display();
            });
          }}
        />
        <p className="label">Transaction Amount (billion USD):</p>
        <div className="slider">
          <Slider
            range
            min={0}
            max={1000}
            step={10}
            defaultValue={[0, 1000]}
            onAfterChange={([minTransaction, maxTransaction]) => {
              this.setState({minTransaction, maxTransaction}, () => {
                this.display();
              });
            }}
          />
        </div>
        <div className="clearBoth"></div>
        <pre>
          <code>{JSON.stringify(this.state.highlighted, null, 2)}</code>
        </pre>
      </>
    );
  }
}

export default App;
