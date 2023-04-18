const scrapeTableRows = require('./Wiki_Table_Scrape');

//--This function f1 scrapes the tables of for name of Emerging Technologies & its uses only if they have commercial uses

//TRY1:  async function f1(){
//     await scrapeTableRows('https://en.wikipedia.org/wiki/List_of_emerging_technologies');
// }
// f1();

const URL1 = 'https://en.wikipedia.org/wiki/List_of_emerging_technologies';

console.log("-----Only Emerging Technoliges that are somewhat commercialized---- \n");
scrapeTableRows(URL1)
    .then((data) => {
        data.map((entry) => {
            console.log("Tech: "+entry[0]+"\nUse: "+entry[1]+"\n");
        });
        console.log("\n-----------END---------");

    })
    .catch((error) => {
        console.error(error);
    });