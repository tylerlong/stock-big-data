import {highlight} from './utils';
import symbols from '../data/interested.json';

console.log(
  highlight({
    symbols,
    startDate: '20210226',
    endDate: '20210301',
    take: 100,
    minMoneyAmount: 0,
  })
);
