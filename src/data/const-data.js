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

module.exports = {
  TITLES,
  TYPES,
  TIMES,
  FEATURES,
  PHOTOS,
  Rooms,
  GuestsPerRoom,
  Price,
  Cords
};
