import {highlight} from './utils';
import symbols from '../data/interested.json';

console.log(
  highlight({
    symbols,
    startDate: '20200226',
    endDate: '20210226',
    take: 100,
  })
);
