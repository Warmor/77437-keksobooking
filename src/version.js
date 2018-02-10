const packageInfo = require(`../package.json`);
require(`colors`);

const [MAJOR_VERSION, MINOR_VERSION, PATCH_VERSION] = packageInfo.version.split(`.`);

module.exports = {
  name: `version`,
  description: `Показать версию программы`,
  execute() {
    console.log(`v${MAJOR_VERSION.red}.${MINOR_VERSION.green}.${PATCH_VERSION.blue}`);
  }
};
