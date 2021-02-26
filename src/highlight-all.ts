import {loadSymbols, highlight} from './utils';

console.log(
  highlight({
    symbols: loadSymbols(),
    startDate: '20210219',
    endDate: '20210225',
    take: 100,
  })
);
