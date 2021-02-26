import {highlight} from './utils';
import symbols from '../data/interested.json';

console.log(
  highlight({
    symbols,
    startDate: '20210219',
    endDate: '20210225',
    take: 100,
  })
);
