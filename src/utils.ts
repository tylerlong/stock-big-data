import path from 'path';
import fs from 'fs';
import R from 'ramda';

import aSymbols from '../data/active.json';
import iSymbols from '../data/interested.json';
import blackList from '../data/blacklist.json';

export const loadSymbols = (): {[symbol: string]: string} => {
  const result: {[symbol: string]: string} = {...iSymbols, ...aSymbols};
  for (const black of blackList) {
    delete result[black];
  }
  return result;
};

export type History = {
  [symbol: string]: {
    [date: string]: {
      open: number;
      high: number;
      low: number;
      close: number;
      aClose: number;
      volume: number;
    };
  };
};

export const loadHistory = (): History => {
  const history: History = {};
  const symbols = loadSymbols();
  for (const symbol of Object.keys(symbols)) {
    history[symbol] = {};
    const text = fs.readFileSync(
      path.join(__dirname, '..', 'downloads', `${symbol}.csv`),
      'utf-8'
    );
    for (const line of R.tail(text.split('\n'))) {
      const tokens = line.split(',');
      history[symbol][tokens[0].replace(/-/g, '')] = {
        open: parseFloat(tokens[1]),
        high: parseFloat(tokens[2]),
        low: parseFloat(tokens[3]),
        close: parseFloat(tokens[4]),
        aClose: parseFloat(tokens[5]),
        volume: parseFloat(tokens[6]),
      };
    }
  }
  return history;
};

export type HighlightOptions = {
  symbols: {[symbol: string]: string};
  startDate: string;
  endDate: string;
  take: number;
};
export const highlight = (options: HighlightOptions) => {
  const list = [];
  const history = loadHistory();
  for (const symbol of Object.keys(options.symbols)) {
    const start = history[symbol][options.startDate];
    if (start === undefined) {
      continue;
    }
    const end = history[symbol][options.endDate];
    list.push({
      symbol,
      name: options.symbols[symbol],
      start: start.close,
      end: end.close,
      change: (end.close - start.close) / start.close,
      link: `https://robinhood.com/stocks/${symbol}`,
    });
  }

  const result = R.reverse(R.sortBy(R.pipe(R.prop('change'), Math.abs))(list));
  return R.take(options.take, result);
};
