import symbols from '../data/active.json';
import {downloadAll} from './crawler';

(async () => {
  await downloadAll(Object.keys(symbols), true);
})();
