const packageInfo = require(`${process.cwd()}/package.json`);

const [MAJOR_VERSION, MINOR_VERSION, PATCH_VERSION] = packageInfo.version.split(`.`);

module.exports = {
  name: `version`,
  description: `Показать версию программы`,
  execute() {
    return new Promise((resolve, reject) => {
      try {
        resolve(console.log(`v${MAJOR_VERSION.red}.${MINOR_VERSION.green}.${PATCH_VERSION.blue}`));
      } catch (err) {
        reject(err);
      }
    });
  }
};
