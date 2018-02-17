const packageInfo = require(`${process.cwd()}/package.json`);

module.exports = {
  name: `author`,
  description: `Показать автора программы`,
  value: packageInfo.author,
  execute() {
    return new Promise((resolve, reject) => {
      try {
        resolve(console.log(`${this.value.cyan}`));
      } catch (err) {
        reject(err);
      }
    });
  }
};
