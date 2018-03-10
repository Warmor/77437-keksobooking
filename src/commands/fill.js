require(`colors`);
const {generateEntity} = require(`${process.cwd()}/src/generator/data-generator.js`);
const {toSave} = require(`${process.cwd()}/src/server/util/decorator`);
const offersStore = require(`${process.cwd()}/src/server/offers/store`);
const prompt = require(`${process.cwd()}/src/prompt.js`).prompt;
module.exports = {
  name: `fill`,
  description: `Создать данные для поекта`,
  async execute() {
    const quality = await prompt(`Сколько данных хочешь?${`(number)`.green} `);
    const writeDb = [...new Array(parseInt(quality, 10))].map(() => {
      return offersStore.save(toSave(generateEntity()));
    });
    return Promise.all(writeDb).then(() => console.log(`Данные добавлены`.cyan));
  }
};
