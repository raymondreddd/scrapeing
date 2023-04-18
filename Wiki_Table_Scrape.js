const puppeteer = require('puppeteer');

// const URL = 'https://en.wikipedia.org/wiki/List_of_emerging_technologies';

async function scrapeTableRows(URL) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    //#Check1: to get whole code
    // const code = await page.content();
    // console.log(code);

    await page.waitForSelector('.mw-page-container');

    //page.$$() is a Puppeteer method that returns an array of all elements that match the specified selector.
    const rows = await page.$$('table.wikitable tbody tr');

    //Promise.all() is a method in JavaScript that takes an array of promises as input and returns a single promise that resolves with an array of the results from each of the input promises, in the same order as the original array.
    const data = await Promise.all(rows.map(async (row) => {
      const columns = await row.$$('td');

      //---Only extract 1st and 3rd column, & column 2nd should not have research and devlopment text in it
      //only get 1st, 2nd & 3rd columns using destructring

      //****code1
      const [column1 , column3] = await Promise.all([
        columns[0].evaluate(column => column.textContent.trim()),
        columns[2].evaluate(column => column.textContent.replace(/\[\d+\]/g, '').trim())
      ]);

      // const regex1 = /(?<=^|,)commercialization(?=$|,)/i;
      // const regex2 = /^.*,?\s*commercialization\s*(?:,|$)/i;
      const regex3 = /\b\w*commercialization\w*\b/i;


      // Filtering rows based on second column containing the word "commercialization"
      const column2 = await columns[1].evaluate(column => column.textContent.trim());
      if (regex3.test(column2)) {
        console.log("Name of Tech: "+column1+ "\n Use:"+column3+"\n");
        return [column1, column3];
      }


      //******prv code to extract all columns*
      // const rowData = await Promise.all(columns.map(async (column) => {
      //   return await column.evaluate((element) => element.textContent);
      // }));
      // return rowData;


    }));


    await browser.close();
    return data.filter(Boolean);
  } catch (error) {
    console.error(error);
    return [];
  }
}

// scrapeTableRows()
//   .then((data) => {
//     console.log("End");
//     // console.log(data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports = scrapeTableRows;