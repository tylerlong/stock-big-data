import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import waitFor from 'wait-for-async';

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://finance.yahoo.com/quote/RNG/history');
  const downloadButtonSelector = 'a[download="RNG.csv"]';
  await page.waitForSelector(downloadButtonSelector);
  const filePath = '/Users/tyler.liu/Downloads/RNG.csv';
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  await page.click(downloadButtonSelector);
  await waitFor({
    interval: 1000,
    condition: () => {
      return fs.existsSync(filePath);
    },
  });
  await browser.close();
})();
