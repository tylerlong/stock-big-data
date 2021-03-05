import symbols from '../../data/interested.json';
import {downloadAll} from './crawler';

(async () => {
  await downloadAll(Object.keys(symbols), false);
})();
