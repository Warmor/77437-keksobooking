const {getRandomArrayItem} = require(`../../utils.js`);
const constData = require(`../../data/const-data.js`);

const _transformToLine = (data, structureData) => {
  for (const key of Object.keys(data)) {
    if (typeof data[key] === `object` && !Array.isArray(data[key])) {
      _transformToLine(data[key], structureData);
    } else {
      structureData[key] = data[key];
    }
  }
};

const toSave = (data) => {
  const structureData = {};
  _transformToLine(data, structureData);
  return {
    name: structureData.name || getRandomArrayItem(constData.NAMES),
    avatar: structureData.avatar || null,
    title: structureData.title || null,
    description: structureData.description || null,
    address: structureData.address || null,
    price: structureData.price || null,
    type: structureData.type || null,
    rooms: structureData.rooms || null,
    guests: structureData.guests || null,
    checkin: structureData.checkin || null,
    checkout: structureData.checkout || null,
    features: structureData.features || null,
    photos: structureData.photos || null,
    x: structureData.x || null,
    y: structureData.y || null,
    date: structureData.date || null,
  };
};

const toSend = (data) => ({
  author: {
    name: data.name || getRandomArrayItem(constData.NAMES),
    avatar: data.avatar || null
  },
  offer: {
    title: data.title || null,
    description: data.description || null,
    address: data.address || null,
    price: data.price || null,
    type: data.type || null,
    rooms: data.rooms || null,
    guests: data.guests || null,
    checkin: data.checkin || null,
    checkout: data.checkout || null,
    features: data.features || null,
    photos: data.photos || null,
  },
  location: {
    x: data.x || null,
    y: data.y || null,
  },
  date: data.date || null,
});

module.exports = {
  toSave,
  toSend
};
