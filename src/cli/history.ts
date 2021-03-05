import path from 'path';
import fs from 'fs';
import R from 'ramda';

import {History} from '../types';
import symbols from '../symbols';

const history: History = {};
for (const symbol of Object.keys(symbols)) {
  history[symbol] = {};
  const text = fs.readFileSync(
    path.join(__dirname, '..', '..', 'downloads', `${symbol}.csv`),
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

export default history;
