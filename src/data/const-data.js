const NAMES = [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`];
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
const FEATURES = [`dishwasher`, `elevator`, `conditioner`, `parking`, `washer`, `wifi`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const DESCRIPTION_LENGTH_MAX = 100;
const Names = {
  LIST: [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`],
  MIN: 2,
  MAX: 30,
};
const TitlesLength = {
  MIN: 30,
  MAX: 140,
};
const Rooms = {
  MIN: 1,
  MAX: 5,
};
const GuestsPerRoom = {
  MIN: 1,
  MAX: 3,
};
const Price = {
  MIN: 1,
  MAX: 100000,
};
const Address = {
  MIN: 5,
  MAX: 100,
};
const Cords = {
  X_MIN: 300,
  X_MAX: 900,
  Y_MIN: 150,
  Y_MAX: 500,
};

module.exports = {
  NAMES,
  TITLES,
  TYPES,
  TIMES,
  FEATURES,
  PHOTOS,
  DESCRIPTION_LENGTH_MAX,
  Names,
  TitlesLength,
  Rooms,
  GuestsPerRoom,
  Price,
  Address,
  Cords
};
