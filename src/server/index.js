const express = require(`express`);
const logger = require(`./../logger`);
const offersStore = require(`./offers/store`);
const imageStore = require(`./images/store`);
const offersRouter = require(`./offers/route`)(offersStore, imageStore);
const HOST = process.env.SERVER_HOST || `127.0.0.1`;
const PORT = process.env.SERVER_PORT || 3000;

const app = express();
app.use(express.static(`static`));

app.use(`/api/offers`, offersRouter);

module.exports = {
  run(port = PORT) {
    app.listen(port, HOST, (err) => {
      if (err) {
        throw new Error(err);
      }
      let serverAddress = `http://${HOST}:${port}`;
      logger.info(`Server running at ${serverAddress}/`);
    });
  },
  serverInstance: app,
};
