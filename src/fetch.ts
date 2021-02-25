import puppeteer from 'puppeteer';
import fs from 'fs';
import waitFor from 'wait-for-async';
import os from 'os';
import path from 'path';
import symbols from '../symbols.json';

const download = async (page: puppeteer.Page, symbol: string) => {
  const downloadButtonSelector = `a[download="${symbol}.csv"]`;
  const filePath = path.join(os.homedir(), 'Downloads', `${symbol}.csv`);
  await page.goto(`https://finance.yahoo.com/quote/${symbol}/history`);
  await page.waitForSelector(downloadButtonSelector);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  await page.click(downloadButtonSelector);
  const successful = await waitFor({
    interval: 100,
    condition: () => {
      return fs.existsSync(filePath);
    },
    times: 300,
  });
  if (!successful) {
    throw new Error('Download timeout');
  }
  fs.renameSync(
    filePath,
    path.join(__dirname, '..', 'downloads', `${symbol}.csv`)
  );
};

(async () => {
  let browser = await puppeteer.launch({headless: false});
  let page = await browser.newPage();
  let index = 0;
  for (const symbol of Object.keys(symbols)) {
    console.log(`${++index}: ${symbol}`);

    // skip downloaded
    if (
      fs.existsSync(path.join(__dirname, '..', 'downloads', `${symbol}.csv`))
    ) {
      console.log('Skipping...');
      continue;
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        await download(page, symbol);
        break;
      } catch (e) {
        // restart browser
        await browser.close();
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
      }
    }
  }
  await browser.close();
})();
