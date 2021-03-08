import React from 'react';
import {DatePicker, Slider} from 'antd';

import history from '../../data/history.json';
import {highlight} from '../highlight';
import symbols from '../symbols';
import {HighlightItem} from '../types';

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
        {this.state.highlighted.map((hi: HighlightItem, index: number) => (
          <Stock stock={hi} index={index} key={hi.symbol} />
        ))}
      </>
    );
  }
}

class Stock extends React.Component<{stock: HighlightItem; index: number}> {
  render() {
    const {stock, index} = this.props;
    return (
      <div>
        <p>
          {index + 1}.{' '}
          <a href={stock.link} target="_blank" rel="noreferrer">
            {stock.symbol} ({stock.name})
          </a>
          -{' '}
          <a href={stock.community} target="_blank" rel="noreferrer">
            community
          </a>
          <br />
          From ${stock.start.toFixed(2)} to ${stock.end.toFixed(2)},{' '}
          <span className={stock.change > 0 ? 'green' : 'red'}>
            {stock.change > 0 ? '+' : ''}
            {(stock.change * 100).toFixed(2)}%
          </span>
          , transaction amount is {stock.transactionAmount} USD.
        </p>
      </div>
    );
  }
}

export default App;
