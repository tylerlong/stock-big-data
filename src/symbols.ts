import aSymbols from '../data/active.json';
import iSymbols from '../data/interested.json';
import blackList from '../data/blacklist.json';

const loadSymbols = (): {[symbol: string]: string} => {
  const result: {[symbol: string]: string} = {...iSymbols, ...aSymbols};
  for (const black of blackList) {
    delete result[black];
  }
  return result;
};

const symbols = loadSymbols();

export default symbols;
