const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const path = require(`path`);
const {promisify} = require(`util`);

const readfile = promisify(fs.readFile);

const HOST = `127.0.0.1`;
const PORT = 3000;

const typeFileMap = new Map([
  [`.ico`, `image/x-icon`],
  [`.html`, `text/html`],
  [`.js`, `application/javascript`],
  [`.json`, `application/json`],
  [`.css`, `text/css`],
  [`.png`, `image/png`],
  [`.jpg`, `image/jpeg`],
  [`.gif`, `image/gif`],
]);

const server = http.createServer((req, res) => {
  (async () => {
    try {
      const pathName = (url.parse(req.url).pathname === `/`) ? `/index.html` : url.parse(req.url).pathname;
      const absolutePath = `${process.cwd()}/static${pathName}`;
      const fileExtension = path.extname(pathName);
      const data = await readfile(absolutePath);

      res.statusCode = 200;
      res.statusMessage = `OK`;
      res.setHeader(`content-type`, typeFileMap.get(fileExtension));
      res.setHeader(`content-length`, Buffer.byteLength(data));
      res.end(data, `utf-8`);

    } catch (e) {
      res.statusCode = 404;
      res.statusMessage = `err`;
      res.setHeader(`content-type`, typeFileMap.get(`.html`));
      res.end(`Ошибка 404. Страница "http://${HOST}:${url.parse(req.url).pathname}" найдена`, `utf-8`);
    }
  })().catch((e) => {
    res.writeHead(500, e.message, {
      'content-type': `text/plain`
    });
    res.end(e.message, `utf-8`);
  });
});

module.exports = {
  run(port = PORT) {
    console.log(port);
    server.listen(port, HOST, (err) => {
      if (err) {
        throw new Error(err);
      }
      let serverAdress = `http://${HOST}:${port}`;
      console.log(`Server runs at ${serverAdress}/`);
    });
  }
};
