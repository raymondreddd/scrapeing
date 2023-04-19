const fs = require('fs')
const pdfParse = require('pdf-parse')

const getPDF = async (file) => {
  let readFileSync = fs.readFileSync(file)

  try {
    let pdfExtract = await pdfParse(readFileSync)
    console.log('File content: ', pdfExtract.text)
    console.log('\n \n Total pages: ', pdfExtract.numpages)
    console.log('\n \n \n All content: ', pdfExtract.info)
  } catch (error) {
    throw new Error(error)
  }
}
const pdfRead = './resume.pdf'
getPDF(pdfRead)