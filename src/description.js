const packageInfo = require(`../package.json`);
require(`colors`);
module.exports = {
  name: `description`,
  description: `Показать описание программы`,
  execute() {
    console.log(`${packageInfo.description.magenta}`);
  }
};
