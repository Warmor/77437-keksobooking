const packageInfo = require(`${process.cwd()}/package.json`);

module.exports = {
  name: `license`,
  description: `Показать лицензию программы`,
  execute() {
    return new Promise((resolve, reject) => {
      try {
        resolve(console.log(`${packageInfo.license.yellow}`));
      } catch (err) {
        reject(err);
      }
    });
  }
};
