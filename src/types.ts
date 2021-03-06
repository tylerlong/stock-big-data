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
  minMoney: number;
  maxMoney: number;
};
