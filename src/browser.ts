import puppeteer from 'puppeteer';

let browser: puppeteer.Browser | undefined = undefined;

class Browser {
  static async newPage(): Promise<puppeteer.Page> {
    if (browser !== undefined) {
      await browser.close();
    }
    browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', req => {
      if (
        req.resourceType() === 'stylesheet' ||
        req.resourceType() === 'font' ||
        req.resourceType() === 'image'
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });
    return page;
  }
  static async revoke() {
    if (browser !== undefined) {
      await browser.close();
      browser = undefined;
    }
  }
}

export default Browser;
