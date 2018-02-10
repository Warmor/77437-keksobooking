const packageInfo = require(`../package.json`);
require(`colors`);

module.exports = {
  name: `license`,
  description: `Показать лицензию программы`,
  execute() {
    console.log(`${packageInfo.license.yellow}`);
  }
};
