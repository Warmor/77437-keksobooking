const {getRandomNumber, getRandomArrayItem} = require(`../utils.js`);

const TITLES = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`,
];

const TYPES = [`flat`, `palace`, `house`, `bungalo`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const Rooms = {
  MIN: 1,
  MAX: 5,
};
const GuestsPerRoom = {
  MIN: 1,
  MAX: 3,
};
const Price = {
  MIN: 1000,
  MAX: 1000000,
};
const Cords = {
  X_MIN: 300,
  X_MAX: 900,
  Y_MIN: 150,
  Y_MAX: 500,
};

const generateEntity = () => {
  const rooms = getRandomNumber(Rooms.MIN, Rooms.MAX);
  const guests = rooms * (getRandomNumber(GuestsPerRoom.MIN, GuestsPerRoom.MAX));
  const checkin = getRandomArrayItem(TIMES);
  const checkout = getRandomArrayItem(TIMES.slice(TIMES.indexOf(checkin)));

  const location = {
    x: getRandomNumber(Cords.X_MIN, Cords.X_MAX),
    y: getRandomNumber(Cords.Y_MIN, Cords.Y_MAX),
  };

  return {
    author: {
      avatar: `https://robohash.org/${(Math.random() + 1).toString(36).substring(4)}`
    },
    offer: {
      title: getRandomArrayItem(TITLES),
      address: `${location.x}, ${location.y}`,
      price: getRandomNumber(Price.MIN, Price.MAX),
      type: getRandomArrayItem(TYPES),
      rooms,
      guests,
      checkin,
      checkout,
      features: FEATURES.filter(() => Math.random() > 0.5),
      description: ``,
      photos: PHOTOS.sort(() => Math.random() > 0.5 ? -1 : 1),
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
