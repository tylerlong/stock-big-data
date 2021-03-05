import {loadHistory} from './utils';
import symbols from '../data/interested.json';
import {highlight} from './highlight';

console.log(
  highlight(loadHistory(), {
    symbols,
    startDate: '20210226',
    endDate: '20210301',
    take: 100,
    minMoneyAmount: 0,
  })
);
