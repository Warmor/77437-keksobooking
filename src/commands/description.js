const packageInfo = require(`${process.cwd()}/package.json`);

module.exports = {
  name: `description`,
  description: `Показать описание программы`,
  execute() {
    return new Promise((resolve, reject) => {
      try {
        resolve(console.log(`${packageInfo.description.magenta}`));
      } catch (err) {
        reject(err);
      }
    });
  }
};
