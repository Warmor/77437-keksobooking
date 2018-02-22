const constData = require(`../data/const-data.js`);

const {getRandomNumber, getRandomArrayItem} = require(`../utils.js`);

const generateEntity = () => {
  const rooms = getRandomNumber(constData.Rooms.MIN, constData.Rooms.MAX);
  const guests = rooms * (getRandomNumber(constData.GuestsPerRoom.MIN, constData.GuestsPerRoom.MAX));
  const checkin = getRandomArrayItem(constData.TIMES);
  const checkout = getRandomArrayItem(constData.TIMES.slice(constData.TIMES.indexOf(checkin)));

  const location = {
    x: getRandomNumber(constData.Cords.X_MIN, constData.Cords.X_MAX),
    y: getRandomNumber(constData.Cords.Y_MIN, constData.Cords.Y_MAX),
  };

  return {
    author: {
      avatar: `https://robohash.org/${(Math.random() + 1).toString(36).substring(4)}`
    },
    offer: {
      title: getRandomArrayItem(constData.TITLES),
      address: `${location.x}, ${location.y}`,
      price: getRandomNumber(constData.Price.MIN, constData.Price.MAX),
      type: getRandomArrayItem(constData.TYPES),
      rooms,
      guests,
      checkin,
      checkout,
      features: constData.FEATURES.filter(() => Math.random() > 0.5),
      description: ``,
      photos: constData.PHOTOS.sort(() => Math.random() > 0.5 ? -1 : 1),
    },
    location: {
      x: location.x,
      y: location.y
    },
  };
};

module.exports = {
  generateEntity
};
