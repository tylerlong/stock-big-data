import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import os from 'os';
import waitFor from 'wait-for-async';

import Browser from './browser';

export const downloadAll = async (symbols: string[], skip = true) => {
  let page = await Browser.newPage();
  let index = 0;
  for (const symbol of symbols) {
    console.log(`${++index}: ${symbol}`);

    if (skip) {
      if (
        fs.existsSync(path.join(__dirname, '..', 'downloads', `${symbol}.csv`))
      ) {
        console.log('Skipping...');
        continue;
      }
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        await downloadOne(page, symbol);
        break;
      } catch (e) {
        page = await Browser.newPage();
      }
    }
  }
  await Browser.revoke();
};

const downloadOne = async (page: puppeteer.Page, symbol: string) => {
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
    times: 100,
  });
  if (!successful) {
    throw new Error('Download timeout');
  }
  fs.renameSync(
    filePath,
    path.join(__dirname, '..', 'downloads', `${symbol}.csv`)
  );
};
