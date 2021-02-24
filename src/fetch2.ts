import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

import symbols from '../symbols.json';

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(
    'https://in.finance.yahoo.com/screener/predefined/most_actives'
  );
  await page.waitForSelector('table');
  const text = await page.evaluate(
    () => document.querySelector('table')!.innerText
  );
  await browser.close();
  const lines = text.split('\n');
  for (let i = 2; i < lines.length; i += 2) {
    console.log(lines[i].trim(), lines[i + 1].trim().split('\t')[0]);
    (symbols as any)[lines[i].trim()] = lines[i + 1].trim().split('\t')[0];
    const jsonText = JSON.stringify(symbols, null, 2);
    console.log(jsonText);
    fs.writeFileSync(path.join(__dirname, '..', 'symbols.json'), jsonText);
  }
})();
