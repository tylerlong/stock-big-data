import fs from 'fs';
import path from 'path';

import history from './history';

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'history.json'),
  JSON.stringify(history, null, 2)
);
