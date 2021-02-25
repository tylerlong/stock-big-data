import {downloadAll, downloadActiveList} from './crawler';

(async () => {
  const symbols = await downloadActiveList();
  await downloadAll(Object.keys(symbols), false);
})();
