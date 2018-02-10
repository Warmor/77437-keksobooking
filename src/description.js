const packageInfo = require(`../package.json`);

module.exports = {
  name: `description`,
  description: `Показать описание программы`,
  execute() {
    console.log(`${packageInfo.description}`);
  }
};
