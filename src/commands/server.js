require(`colors`);
const server = require(`${process.cwd()}/src/server/index.js`);
const prompt = require(`${process.cwd()}/src/prompt.js`).prompt;
module.exports = {
  name: `server`,
  description: `Запустить сервер`,
  async execute() {
    const port = await prompt(`Введите порт${`(по умолчанию - 3000)`.green} `);
    return server.run(port);
  }
};
