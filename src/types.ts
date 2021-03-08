export type History = {
  [symbol: string]: {
    [date: string]: {
      open: number;
      high: number;
      low: number;
      close: number;
      aClose: number;
      volume: number;
    };
  };
};

export type HighlightOptions = {
  symbols: {[symbol: string]: string};
  startDate: string;
  endDate: string;
  take: number;
  minTransaction: number;
  maxTransaction: number;
};

export type HighlightItem = {
  symbol: string;
  name: string;
  start: number;
  end: number;
  change: number;
  transactionAmount: string;
  link: string;
  community: string;
};
