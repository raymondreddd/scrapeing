const puppeteer = require('puppeteer');

const URL = 'https://en.wikipedia.org/wiki/List_of_emerging_technologies';

async function scrapeTableRows() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    //#Check1: to get whole code
    // const code = await page.content();
    // console.log(code);


    await page.waitForSelector('.mw-page-container');
    console.log("Wait done for selector");

    //page.$$() is a Puppeteer method that returns an array of all elements that match the specified selector.
    const rows = await page.$$('table.wikitable tbody tr');


    //Promise.all() is a method in JavaScript that takes an array of promises as input and returns a single promise that resolves with an array of the results from each of the input promises, in the same order as the original array.
    const data = await Promise.all(rows.map(async (row) => {
      const columns = await row.$$('td');
      const rowData = await Promise.all(columns.map(async (column) => {
        return await column.evaluate((element) => element.textContent);
      }));
      return rowData;
    }));
    await browser.close();
    return data;
  } catch (error) {
    console.error(error);
  }
}

scrapeTableRows()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
