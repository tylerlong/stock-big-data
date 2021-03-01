import {loadSymbols, highlight} from './utils';

console.log(
  highlight({
    symbols: loadSymbols(),
    startDate: '20210226',
    endDate: '20210301',
    take: 100,
  })
);
