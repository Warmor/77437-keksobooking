const assert = require(`assert`);
const request = require(`supertest`);
const app = require(`express`)();
const mockOffersRouter = require(`./mock-offers-router`);
app.use(`/api/offers`, mockOffersRouter);

describe(`GET /api/offers`, () => {
  const expectedDataLength = 4;

  it(`respond with json`, () => {
    return request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const responseData = response.body;
          assert.equal(responseData.total, 100);
          assert.equal(responseData.data.length, 20);
          assert.equal(Object.keys(responseData.data[0]).length, expectedDataLength);
        });
  });

  it(`Should respond 404`, () => {
    return request(app)
        .get(`/api/offersasd`)
        .set(`Accept`, `application/json`)
        .expect(404);
  });

  it(`Should respond with limit query`, () => {
    return request(app)
        .get(`/api/offers?limit=5`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const responseData = response.body;
          assert.equal(responseData.total, 100);
          assert.equal(responseData.data.length, 5);
          assert.equal(Object.keys(responseData.data[0]).length, expectedDataLength);
        });
  });

  it(`Should respond with skip query`, () => {
    return request(app)
        .get(`/api/offers?skip=5`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const responseData = response.body;
          assert.equal(responseData.total, 100);
          assert.equal(responseData.data.length, 20);
          assert.equal(Object.keys(responseData.data[0]).length, expectedDataLength);
        });
  });

  it(`Should respond 400 Bad Request(limit)`, () => {
    return request(app)
        .get(`/api/offers?limit=asd`)
        .set(`Accept`, `application/json`)
        .expect(400);
  });

  it(`Should respond 400 Bad Request(skip)`, () => {
    return request(app)
        .get(`/api/offers?skip=asd`)
        .set(`Accept`, `application/json`)
        .expect(400);
  });

});
