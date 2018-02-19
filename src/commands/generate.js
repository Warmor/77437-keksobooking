require(`colors`);
const {generateEntity} = require(`${process.cwd()}/src/generator/data-generator.js`);
const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);

const prompt = require(`../prompt.js`).prompt;

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
const data = generateEntity();

let dataOption = {};

const askParams = async () => {
  dataOption.quality = await prompt(`Сколько данных хочешь?${`(number)`.green} `);
  if (isNaN(dataOption.quality)) {
    throw new Error(`Это не число`.red);
  }
  dataOption.filePath = await prompt(`Куда положить добро?${`(string)`.green} `);
  if (fs.existsSync(dataOption.filePath)) {
    await prompt(`Добро уже существует. Перезаписать?${`(Y/n)`.green} `);
  }
  return dataOption;
};

module.exports = {
  name: `generate`,
  description: `Создать данные для поекта`,
  async execute(filePath = `${process.cwd()}/covert-data.json`) {
    return await askParams();
    // return writeFile(filePath, JSON.stringify(data), fileWriteOptions)
    //     .then(()=>console.log(`Данные сгенерированны`.green));
  }
};
