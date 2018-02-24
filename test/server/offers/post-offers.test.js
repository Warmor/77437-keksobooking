const request = require(`supertest`);
const app = require(`${process.cwd()}/src/server/index`).serverInstance;

describe(`GET /api/offers`, () => {
  it(`should consume JSON`, () => {
    return request(app).post(`/api/offers`).
        send({
          author: {
            avatar: `https://robohash.org/6sa3t36h`
          },
          offer: {
            title: `Уютное бунгало далеко от моря`,
            address: `462, 428`,
            price: 168679,
            type: `flat`,
            rooms: 5,
            guests: 10,
            checkin: `13:00`,
            checkout: `13:00`,
            features: [
              `dishwasher`,
              `washer`,
              `elevator`
            ],
            description: ``,
            photos: [
              `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
              `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
              `http://o0.github.io/assets/images/tokyo/hotel2.jpg`
            ]
          },
          location: {
            x: 462,
            y: 428
          },
          date: 1519315402942
        }).
        expect(200, {
          author: {
            avatar: `https://robohash.org/6sa3t36h`
          },
          offer: {
            title: `Уютное бунгало далеко от моря`,
            address: `462, 428`,
            price: 168679,
            type: `flat`,
            rooms: 5,
            guests: 10,
            checkin: `13:00`,
            checkout: `13:00`,
            features: [
              `dishwasher`,
              `washer`,
              `elevator`
            ],
            description: ``,
            photos: [
              `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
              `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
              `http://o0.github.io/assets/images/tokyo/hotel2.jpg`
            ]
          },
          location: {
            x: 462,
            y: 428
          },
          date: 1519315402942
        });
  });
  it(`should consume form-data`, () => {
    return request(app).post(`/api/offers`).
        field(`avatar`, `https://robohash.org/6sa3t36h`).
        field(`title`, `Уютное бунгало далеко от моря`).
        field(`address`, `462, 428`).
        field(`price`, `168679`).
        field(`type`, `flat`).
        expect(200, {
          avatar: `https://robohash.org/6sa3t36h`,
          title: `Уютное бунгало далеко от моря`,
          address: `462, 428`,
          price: `168679`,
          type: `flat`,
        });
  });

  it(`should consume form-data with avatar`, () => {
    return request(app).post(`/api/offers`).
        field(`avatar`, `https://robohash.org/6sa3t36h`).
        field(`title`, `Уютное бунгало далеко от моря`).
        field(`address`, `462, 428`).
        field(`price`, `168679`).
        field(`type`, `flat`).
        attach(`avatar`, `test/fixtures/keks.png`).
        expect(200, {
          avatar: `https://robohash.org/6sa3t36h`,
          title: `Уютное бунгало далеко от моря`,
          address: `462, 428`,
          price: `168679`,
          type: `flat`,
        });
  });
});
