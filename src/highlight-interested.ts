import {highlight} from './utils';
import symbols from '../data/interested.json';

const startDate = '20210219';
const endDate = '20210225';
console.log(highlight(symbols, startDate, endDate));
