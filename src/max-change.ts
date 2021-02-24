import glob from 'glob';
import path from 'path';
import R from 'ramda';
import fs from 'fs';

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
    symbols[symbol][tokens[0]] = R.tail(tokens).join(',');
  }
}
console.log(symbols);
