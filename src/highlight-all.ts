import {loadHistory} from './utils';
import {highlight} from './highlight';
import symbols from './symbols';

console.log(
  highlight(loadHistory(), {
    symbols,
    startDate: '20210219',
    endDate: '20210304',
    take: 100,
    minMoneyAmount: 50000000000, // 50 billion
  })
);
