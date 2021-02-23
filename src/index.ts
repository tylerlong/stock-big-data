const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://finance.yahoo.com/quote/RNG/history?p=RNG');
  await page.screenshot({
    path: 'RNG.png',
    clip: {
      x: 0,
      y: 0,
      width: 600,
      height: 1200,
    },
  });

  await browser.close();
})();
