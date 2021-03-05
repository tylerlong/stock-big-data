import {loadSymbols, highlight} from './utils';

console.log(
  highlight({
    symbols: loadSymbols(),
    startDate: '20210219',
    endDate: '20210304',
    take: 100,
    minMoneyAmount: 50000000000, // 50 billion
  })
);
