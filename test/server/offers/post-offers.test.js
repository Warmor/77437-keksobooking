const request = require(`supertest`);
const app = require(`${process.cwd()}/src/server/index`).serverInstance;

describe(`POST /api/offers`, () => {
  it(`should consume JSON`, () => {
    return request(app).post(`/api/offers`).send({
      title: `Неуютное бунгало по колено в воде`,
      type: `flat`,
      rooms: `2`,
      price: `5000`,
      address: `Lorem ipsum dolor.`,
      checkin: `12:30`,
      checkout: `13:20`
    }).expect(200, {
      title: `Неуютное бунгало по колено в воде`,
      type: `flat`,
      rooms: `2`,
      price: `5000`,
      address: `Lorem ipsum dolor.`,
      checkin: `12:30`,
      checkout: `13:20`
    });
  });
  it(`should consume form-data`, () => {
    return request(app).post(`/api/offers`)
        .field(`title`, `Неуютное бунгало по колено в воде`)
        .field(`type`, `flat`)
        .field(`rooms`, `2`)
        .field(`price`, `5000`)
        .field(`address`, `Lorem ipsum dolor.`)
        .field(`checkin`, `12:30`)
        .field(`checkout`, `13:20`)
        .expect(200, {
          title: `Неуютное бунгало по колено в воде`,
          type: `flat`,
          rooms: `2`,
          price: `5000`,
          address: `Lorem ipsum dolor.`,
          checkin: `12:30`,
          checkout: `13:20`
        });
  });
});
