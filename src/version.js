const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Показать версию программы`,
  execute() {
    console.log(`v${packageInfo.version}`);
  }
};
