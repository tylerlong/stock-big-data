import history from './history';
import {highlight} from '../highlight';
import symbols from '../symbols';

console.log(
  highlight(history, {
    symbols,
    startDate: '20210219',
    endDate: '20210305',
    take: 100,
    minMoney: 50 * 1000000000, // 50 billion
    maxMoney: 1000 * 1000 * 1000000000, // 1000 trillion
  })
);
