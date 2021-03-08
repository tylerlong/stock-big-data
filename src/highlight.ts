import * as R from 'ramda';

import {History, HighlightOptions, HighlightItem} from './types';

export const highlight = (
  history: History,
  options: HighlightOptions
): HighlightItem[] => {
  const list = [];
  for (const symbol of Object.keys(options.symbols)) {
    const start = history[symbol][options.startDate];
    if (start === undefined) {
      continue;
    }
    const end = history[symbol][options.endDate];

    // filter by money amount
    let transactionAmount = 0;
    for (
      let i = parseInt(options.startDate);
      i <= parseInt(options.endDate);
      i++
    ) {
      const stockData = history[symbol][i.toString()];
      if (!stockData) {
        continue; // weekend and holiday
      }
      transactionAmount += stockData.close * stockData.volume;
    }
    if (
      transactionAmount < options.minTransaction ||
      transactionAmount > options.maxTransaction
    ) {
      console.log(
        `${symbol}: ${Math.round(transactionAmount / 1000000000)} billion`
      );
      continue;
    }

    list.push({
      symbol,
      name: options.symbols[symbol],
      start: start.close,
      end: end.close,
      change: (end.close - start.close) / start.close,
      transactionAmount: `${Math.round(
        transactionAmount / 1000000000
      )} billion`,
      link: `https://robinhood.com/stocks/${symbol}`,
      community: `https://finance.yahoo.com/quote/${symbol}/community`,
    });
  }
  const result = R.reverse(R.sortBy(R.pipe(R.prop('change'), Math.abs))(list));
  return R.take(options.take, result);
};
