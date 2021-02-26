import R from 'ramda';

import {loadHistory, loadSymbols} from './utils';

const symbols = loadSymbols();
const history = loadHistory();
const startDate = '20210219';
const endDate = '20210225';
const list = [];

for (const symbol of Object.keys(history)) {
  console.log(symbol);
  const start = history[symbol][startDate];
  if (start === undefined) {
    continue;
  }
  const end = history[symbol][endDate];
  list.push({
    symbol,
    name: symbols[symbol],
    start,
    end,
    change: (end.close - start.close) / start.close,
  });
}

const result = R.reverse(R.sortBy(R.pipe(R.prop('change'), Math.abs))(list));
console.log(R.take(10, result));
