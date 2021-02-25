import symbols from '../symbols.json';

import {downloadAll} from './crawler';

(async () => {
  await downloadAll(Object.keys(symbols), true);
})();
