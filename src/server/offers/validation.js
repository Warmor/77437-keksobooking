const {textRange, isImage, oneOf, anyOf, inRange, unique, isTimeFormat} = require(`../util/assertion`);
const {getRandomArrayItem} = require(`${process.cwd()}/src/utils.js`);
const constData = require(`${process.cwd()}/src/data/const-data.js`);

const schema = {
  title: {
    required: true,
    converter(val) {
      return val.toString().trim();
    },
    assertions: [
      textRange(constData.TitlesLength.MIN, constData.TitlesLength.MAX)
    ]
  },
  type: {
    required: true,
    assertions: [
      oneOf(constData.TYPES)
    ]
  },
  rooms: {
    required: true,
    assertions: [
      inRange(constData.Rooms.MIN, constData.Rooms.MAX)
    ]
  },
  price: {
    required: true,
    assertions: [
      inRange(constData.Price.MIN, constData.Price.MAX)
    ]
  },
  address: {
    required: true,
    assertions: [
      textRange(constData.Address.MIN, constData.Address.MAX)
    ]
  },
  checkin: {
    required: true,
    assertions: [
      isTimeFormat()
    ]
  },
  checkout: {
    required: true,
    assertions: [
      isTimeFormat()
    ]
  },
  features: {
    required: false,
    assertions: [
      anyOf(constData.FEATURES),
      unique()
    ]
  },
  description: {
    required: false,
    assertions: [
      textRange(0, constData.DESCRIPTION_LENGTH_MAX)
    ]
  },
  avatar: {
    required: false,
    assertions: [
      isImage()
    ]
  },
  preview: {
    required: false,
    assertions: [
      isImage()
    ]
  },
  name: {
    required: false,
    converter(val) {
      if (val) {
        return val.trim();
      } else {
        return getRandomArrayItem(constData.Names.list);
      }
    },
    assertions: [
      textRange(constData.Names.MIN, constData.Names.MAX)
    ]
  }
};

module.exports = schema;

