const {validate} = require(`${process.cwd()}/src/server/util/validator`);
const schema = require(`${process.cwd()}/src/server/offers/validation`);
const constData = require(`${process.cwd()}/src/data/const-data.js`);
const assert = require(`assert`);

const assertField = (fieldName, fieldValue, ...errorMessages) => {

  const expected = errorMessages.map((errorMessage) => ({
    fieldName, fieldValue, errorMessage
  }));

  const actual = validate({[fieldName]: fieldValue}, fieldName, schema[fieldName]);

  assert.deepEqual(actual, expected);
};

describe(`validate offers fields`, () => {
  describe(`'title' field validation`, () => {
    const fieldName = `title`;
    it(`should require field`, () => {
      assertField(fieldName, void 0, `is required`);
    });
    it(`should trim passed string`, () => {
      assertField(fieldName, ` 1 `, `should be in range ${constData.TitlesLength.MIN}..${constData.TitlesLength.MAX}`);
    });
    it(`should not be more than 30 symbols`, () => {
      assertField(fieldName, Array(26).fill(`1`).join(``), `should be in range 30..140`);
    });
  });

  describe(`'type' field validation`, () => {
    const fieldName = `type`;
    it(`should require field`, () => {
      assertField(fieldName, void 0, `is required`);
    });
    it(`should be one of`, () => {
      assertField(fieldName, `testFailed`, `should be one of [${constData.TYPES}]`);
    });
  });

  describe(`'rooms' field validation`, () => {
    const fieldName = `rooms`;
    it(`should require field`, () => {
      assertField(fieldName, void 0, `is required`);
    });
    it(`should be in range`, () => {
      assertField(fieldName, `123`, `should be in range ${constData.Rooms.MIN}..${constData.Rooms.MAX}`);
    });
  });

  describe(`'price' field validation`, () => {
    const fieldName = `price`;
    it(`should require field`, () => {
      assertField(fieldName, void 0, `is required`);
    });
    it(`should be in range`, () => {
      assertField(fieldName, `0`, `should be in range ${constData.Price.MIN}..${constData.Price.MAX}`);
    });
  });

  describe(`'address' field validation`, () => {
    const fieldName = `address`;
    it(`should require field`, () => {
      assertField(fieldName, void 0, `is required`);
    });
    it(`should be in range`, () => {
      assertField(fieldName, `123`, `should be in range ${constData.Address.MIN}..${constData.Address.MAX}`);
    });
  });

  describe(`'checkin' field validation`, () => {
    const fieldName = `checkin`;
    it(`should require field`, () => {
      assertField(fieldName, void 0, `is required`);
    });
    it(`should be in range`, () => {
      assertField(fieldName, `123`, `should be format from HH:mm`);
    });
  });

  describe(`'checkout' field validation`, () => {
    const fieldName = `checkout`;
    it(`should require field`, () => {
      assertField(fieldName, void 0, `is required`);
    });
    it(`should be in range`, () => {
      assertField(fieldName, `123`, `should be format from HH:mm`);
    });
  });

  describe(`'features' field validation`, () => {
    const fieldName = `features`;
    it(`should be in range`, () => {
      assertField(fieldName, [123], `should be one of [${constData.FEATURES}]`);
    });
    it(`should be in unique`, () => {
      assertField(fieldName, [`dishwasher`, `dishwasher`], `should be unique`);
    });
  });

  describe(`'avatar' field validation`, () => {
    const fieldName = `avatar`;
    it(`should be an image`, () => {
      assertField(fieldName, `qwe`, `should be an image`);
    });
  });

  describe(`'preview' field validation`, () => {
    const fieldName = `preview`;
    it(`should be an image`, () => {
      assertField(fieldName, `qwe`, `should be an image`);
    });
  });

  describe(`'name' field validation`, () => {
    const fieldName = `name`;
    it(`should be in range`, () => {
      assertField(fieldName, `2`, `should be in range ${constData.Names.MIN}..${constData.Names.MAX}`);
    });
  });

});
