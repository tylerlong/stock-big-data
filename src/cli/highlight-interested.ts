import history from './history';
import symbols from '../../data/interested.json';
import {highlight} from '../highlight';

console.log(
  highlight(history, {
    symbols,
    startDate: '20210226',
    endDate: '20210301',
    take: 100,
    minMoneyAmount: 0,
  })
);
