const server = require(`${process.cwd()}/src/server/index.js`);

module.exports = {
  name: `server`,
  description: `Запустить сервер`,
  execute(port) {
    return new Promise((resolve, reject) => {
      try {
        server.run(port);
      } catch (err) {
        reject(err);
      }
    });
  }
};
