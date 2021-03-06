import history from './history';
import symbols from '../../data/interested.json';
import {highlight} from '../highlight';

console.log(
  highlight(history, {
    symbols,
    startDate: '20210226',
    endDate: '20210305',
    take: 100,
    minMoney: 0,
    maxMoney: 1000 * 1000 * 1000000000, // 1000 trillion
  })
);
