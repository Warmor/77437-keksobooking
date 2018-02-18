require(`colors`);
const {generateEntity} = require(`${process.cwd()}/src/generator/data-generator.js`);
const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
const data = generateEntity();

module.exports = {
  name: `generate`,
  description: `Создать данные для поекта`,
  execute(filePath = `${process.cwd()}/covert-data.json`) {
    return writeFile(filePath, JSON.stringify(data), fileWriteOptions)
        .then(()=>console.log(`Данные сгенерированны`.green));
  }
};
