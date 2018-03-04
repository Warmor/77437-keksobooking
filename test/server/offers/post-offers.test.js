const request = require(`supertest`);
const app = require(`express`)();
const mockOffersRouter = require(`./mock-offers-router`);
app.use(`/api/offers`, mockOffersRouter);

describe(`POST /api/offers`, () => {
  it(`should consume JSON`, () => {
    return request(app).post(`/api/offers`).send({
      author: {
        name: `Petya`,
      },
      offer: {
        title: `Неуютное бунгало по колено в воде`,
        address: `Неуютное бунгало по колено в воде`,
        price: `12305`,
        type: `flat`,
        rooms: `1`,
        guests: `2`,
        checkin: `12:00`,
        checkout: `12:00`,
        features: [`dishwasher`, `elevator`, `conditioner`],
      },
      location: {
        x: 300,
        y: 300,
      },
      date: 1520188660199,
    }).expect(200, {
      author: {
        name: `Petya`,
        avatar: null,
      },
      offer: {
        title: `Неуютное бунгало по колено в воде`,
        description: null,
        address: `Неуютное бунгало по колено в воде`,
        price: `12305`,
        type: `flat`,
        rooms: `1`,
        guests: `2`,
        checkin: `12:00`,
        checkout: `12:00`,
        features: [`dishwasher`, `elevator`, `conditioner`],
        photos: null
      },
      location: {
        x: 300,
        y: 300,
      },
      date: 1520188660199,
    });
  });
  it(`should consume form-data`, () => {
    return request(app).post(`/api/offers`)
        .field(`name`, `Petya`)
        .field(`title`, `Неуютное бунгало по колено в воде`)
        .field(`address`, `Неуютное бунгало по колено в воде`)
        .field(`price`, `12305`)
        .field(`type`, `flat`)
        .field(`rooms`, `1`)
        .field(`guests`, `2`)
        .field(`checkin`, `12:00`)
        .field(`checkout`, `12:00`)
        .field(`features`, `dishwasher, elevator, conditioner`)
        .expect(200, {
          author: {
            name: `Petya`,
            avatar: null,
          },
          offer: {
            title: `Неуютное бунгало по колено в воде`,
            description: null,
            address: `Неуютное бунгало по колено в воде`,
            price: `12305`,
            type: `flat`,
            rooms: `1`,
            guests: `2`,
            checkin: `12:00`,
            checkout: `12:00`,
            features: `dishwasher, elevator, conditioner`,
            photos: null
          },
          location: {
            x: null,
            y: null,
          },
          date: 1520188660199,
        });
  });
});
