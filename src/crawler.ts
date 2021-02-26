import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import os from 'os';
import waitFor from 'wait-for-async';

import Browser from './browser';
import activeSymbols from '../data/active.json';
import blackList from '../data/blacklist.json';

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
  page.goto(`https://finance.yahoo.com/quote/${symbol}/history`, {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForSelector(downloadButtonSelector);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  page.click(downloadButtonSelector);
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

export const downloadActiveList = async (): Promise<{
  [symbol: string]: string;
}> => {
  const page = await Browser.newPage();
  await page.goto(
    'https://in.finance.yahoo.com/screener/predefined/most_actives'
  );
  await page.waitForSelector('table');
  const text = await page.evaluate(
    () => document.querySelector('table')!.innerText
  );
  await Browser.revoke();
  const lines = text.split('\n');
  const symbols: {[symbol: string]: string} = activeSymbols;
  for (let i = 2; i < lines.length; i += 2) {
    symbols[lines[i].trim()] = lines[i + 1].trim().split('\t')[0];
  }
  fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'active.json'),
    JSON.stringify(symbols, null, 2)
  );
  for (const black of blackList) {
    delete symbols[black];
  }
  return symbols;
};
