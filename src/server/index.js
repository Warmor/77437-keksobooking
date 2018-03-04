const express = require(`express`);
const offersStore = require(`./offers/store`);
const imageStore = require(`./images/store`);
const offersRouter = require(`./offers/route`)(offersStore, imageStore);
const HOST = `127.0.0.1`;
const PORT = 3000;

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
      console.log(`Server runs at ${serverAddress}/`);
    });
  },
  serverInstance: app,
};
