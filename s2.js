const unirest = require("unirest");
const cheerio = require("cheerio");
    const getData = async() => {
    try{
    const response = await unirest.get("https://en.wikipedia.org/wiki/List_of_emerging_technologies")
    // console.log(response.body); // HTML
    const $ = cheerio.load(response.body);
    console.log("Book Title: " + $("tr").text());
    }
    catch(e)
    {
    console.log(e);
    }
    }
    getData();