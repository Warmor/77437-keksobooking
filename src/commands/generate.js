require(`colors`);
const {generateEntity} = require(`${process.cwd()}/src/generator/data-generator.js`);
const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  name: `generate`,
  description: `Создать данные для поекта`,
  async execute({filePath = `covert-data.json`, quality = 1}) {
    let data = [...new Array(parseInt(quality, 10))]
        .map(() => {
          return generateEntity();
        });
    return writeFile(`${process.cwd()}/${filePath}`, JSON.stringify(data), fileWriteOptions)
        .then(()=>console.log(`Данные сгенерированны`.green));
  }
};
