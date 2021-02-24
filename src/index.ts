import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import waitFor from 'wait-for-async';
import * as os from 'os';
import * as path from 'path';

const download = async (page: puppeteer.Page, symbol: string) => {
  const downloadButtonSelector = `a[download="${symbol}.csv"]`;
  const filePath = path.join(os.homedir(), 'Downloads', `${symbol}.csv`);
  await page.goto(`https://finance.yahoo.com/quote/${symbol}/history`);
  await page.waitForSelector(downloadButtonSelector);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  await page.click(downloadButtonSelector);
  await waitFor({
    interval: 100,
    condition: () => {
      return fs.existsSync(filePath);
    },
  });
  fs.renameSync(filePath, `./downloads/${symbol}.csv`);
};

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const data = fs.readFileSync('./symbols.csv', 'utf-8');
  for (const line of data.split('\n')) {
    const symbol = line.split('\t')[0];
    console.log(symbol);
    if (fs.existsSync(`./downloads/${symbol}.csv`)) {
      console.log('Skipping...');
      continue;
    }
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        await download(page, symbol);
        break;
      } catch (e) {
        // do nothing
      }
    }
  }
  await browser.close();
})();
