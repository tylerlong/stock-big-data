import {loadSymbols, highlight} from './utils';

const symbols = loadSymbols();
const startDate = '20210219';
const endDate = '20210225';
console.log(highlight(symbols, startDate, endDate));
