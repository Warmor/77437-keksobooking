const createOffersRouter = require(`../../../src/server/offers/route`);
const {generateEntity} = require(`../../../src/generator/data-generator`);

const offers = [];

for (let i = 0; i < 100; i++) {
  offers.push(generateEntity());
}

class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async count() {
    return this.data.length;
  }

  async toArray() {
    return this.data;
  }
}

class OffersStore {
  constructor() {
  }

  async getOffer(date) {
    return offers.find((it) => it.name.toLowerCase() === date);
  }

  async getAllOffers() {
    return new Cursor(offers);
  }

  async save(data) {
    let response = {};
    data.date = 1520188660199;
    response.ops = [data];
    return response;
  }

}

class OffersImageStore {

  async getBucket() {
  }

  async get() {
  }

  async save() {
  }
}

module.exports = createOffersRouter(new OffersStore(), new OffersImageStore());
