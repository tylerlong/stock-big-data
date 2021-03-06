import * as R from 'ramda';

import {History, HighlightOptions} from './types';

export const highlight = (history: History, options: HighlightOptions) => {
  const list = [];
  for (const symbol of Object.keys(options.symbols)) {
    const start = history[symbol][options.startDate];
    if (start === undefined) {
      continue;
    }
    const end = history[symbol][options.endDate];

    // filter by money amount
    let moneyAmount = 0;
    for (
      let i = parseInt(options.startDate);
      i <= parseInt(options.endDate);
      i++
    ) {
      const stockData = history[symbol][i.toString()];
      if (!stockData) {
        continue; // weekend and holiday
      }
      moneyAmount += stockData.close * stockData.volume;
    }
    if (moneyAmount < options.minMoney || moneyAmount > options.maxMoney) {
      console.log(`${symbol}: ${Math.round(moneyAmount / 1000000000)} billion`);
      continue;
    }

    list.push({
      symbol,
      name: options.symbols[symbol],
      start: start.close,
      end: end.close,
      change: (end.close - start.close) / start.close,
      moneyAmount: `${Math.round(moneyAmount / 1000000000)} billion`,
      link: `https://robinhood.com/stocks/${symbol}`,
      community: `https://finance.yahoo.com/quote/${symbol}/community`,
    });
  }
  const result = R.reverse(R.sortBy(R.pipe(R.prop('change'), Math.abs))(list));
  return R.take(options.take, result);
};
