const express = require(`express`);
const offersRouter = require(`./offers/route`);
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
