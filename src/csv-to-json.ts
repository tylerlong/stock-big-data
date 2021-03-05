import fs from 'fs';
import path from 'path';

import {loadHistory} from './utils';

const history = loadHistory();

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'history.json'),
  JSON.stringify(history, null, 2)
);
