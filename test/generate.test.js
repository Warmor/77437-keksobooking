const generateCommand = require(`../src/commands/generate`);
const constData = require(`../src/data/const-data.js`);

const fs = require(`fs`);
const {promisify} = require(`util`);
const access = promisify(fs.access);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);
const assert = require(`assert`);

describe(`Generate JSON command`, function () {
  it(`should fail on not existing folder`, function () {
    const filePath = `folder/testfile.json`;
    return generateCommand.execute({filePath}).then(() => {
      assert.fail(`Path ${filePath} should not be available`);
    }).catch((e) => assert.ok(e));
  });

  it(`should create new file`, function () {
    const filePath = `testfile.json`;
    return generateCommand.execute({filePath})
        .then(() => access(`${process.cwd()}/${filePath}`))
        .then(() => unlink(`${process.cwd()}/${filePath}`));
  });

  it(`validate generate obj`, function () {
    const filePath = `testfile.json`;
    const quality = 5;
    return generateCommand.execute({filePath, quality})
        .then(() => access(filePath))
        .then(() => readFile(filePath))
        .then((data)=> JSON.parse(data))
        .then((data)=> {
          assert.ok(data.length === quality);
          return data;
        })
        .then((generateData)=> generateData[0])
        .then((generateData) => {
          assert.ok(typeof generateData === `object`, `generateData should be object`);
          assert.ok(generateData.author.avatar.indexOf(`https://robohash.org/`) !== -1, `author.avatar should be indexOf "https://robohash.org/"`);
          assert.ok(constData.TITLES.indexOf(generateData.offer.title) !== -1, `offer.title should be should be indexOf constData.TITLES`);
          assert.ok(typeof generateData.offer.address === `string`, `offer.address be string`);
          assert.ok(typeof generateData.offer.price === `number` && generateData.offer.price >= constData.Price.MIN && generateData.offer.price <= constData.Price.MAX, `offer.price should be > constData.Price.MIN & < constData.Price.MAX`);
          assert.ok(constData.TYPES.indexOf(generateData.offer.type) !== -1, `offer.type should be should be indexOf constData.TYPES`);
          assert.ok(typeof generateData.offer.rooms === `number` && generateData.offer.rooms >= constData.Rooms.MIN && generateData.offer.rooms <= constData.Rooms.MAX, `offer.rooms should be > constData.Rooms.MIN & < constData.Rooms.MAX`);
          assert.ok(typeof generateData.offer.guests === `number` && generateData.offer.guests >= 1 && generateData.offer.guests <= 15, `offer.guests should be > 1 & < 15`);
          assert.ok(constData.TIMES.indexOf(generateData.offer.checkin) !== -1, `offer.checkin should be should be indexOf constData.TIMES`);
          assert.ok(constData.TIMES.indexOf(generateData.offer.checkout) !== -1, `offer.checkout should be should be indexOf constData.TIMES`);
          assert.ok(Array.isArray(generateData.offer.features), `offer.features should be Array`);
          assert.ok(generateData.offer.description === ``, `offer.description should be empty string`);
          assert.ok(Array.isArray(generateData.offer.photos), `offer.photos should be Array`);
          assert.ok(typeof generateData.location.x === `number` && generateData.location.x >= constData.Cords.X_MIN && generateData.location.x <= constData.Cords.X_MAX, `location.x should be > Cords.X_MIN & < Cords.X_MAX`);
          assert.ok(typeof generateData.location.y === `number` && generateData.location.y >= constData.Cords.Y_MIN && generateData.location.y <= constData.Cords.Y_MAX, `location.y should be > Cords.Y_MIN & < Cords.Y_MAX`);
        })
        .then(() => unlink(`${process.cwd()}/${filePath}`));
  });

});
