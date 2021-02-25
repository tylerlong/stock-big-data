import glob from 'glob';
import path from 'path';
import R from 'ramda';
import fs from 'fs';

import dict from '../symbols.json';

const files = glob.sync(path.join(__dirname, '..', 'downloads', '*.csv'));
const symbols: any = {};
for (const file of files) {
  console.log(file);
  const symbol = R.last(file.split('/'))!.split('.')[0];
  console.log(symbol);
  const text = fs.readFileSync(file, 'utf-8');
  symbols[symbol] = {};
  for (const line of R.tail(text.split('\n'))) {
    const tokens = line.split(',');
    symbols[symbol][tokens[0].replace(/-/g, '')] = {
      open: tokens[1],
      high: tokens[2],
      low: tokens[3],
      close: tokens[4],
      aClose: tokens[5],
      volume: tokens[6],
    };
  }
}
// console.log(symbols);

const startDate = '20210219';
const endDate = '20210224';
const list = [];

for (const symbol of Object.keys(symbols)) {
  console.log(symbol);
  const start = symbols[symbol][startDate];
  if (start === undefined) {
    continue;
  }
  const end = symbols[symbol][endDate];
  list.push({
    symbol,
    name: (dict as any)[symbol],
    start,
    end,
    change: (end.close - start.close) / start.close,
  });
}

const result = R.reverse(R.sortBy(R.pipe(R.prop('change'), Math.abs))(list));
console.log(R.take(10, result));
