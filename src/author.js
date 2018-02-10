const packageInfo = require(`../package.json`);
require(`colors`);
module.exports = {
  name: `author`,
  description: `Показать автора программы`,
  value: packageInfo.author,
  execute() {
    console.log(`${this.value.cyan}`);
  }
};
