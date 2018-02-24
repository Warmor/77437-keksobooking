const getRandomNumber = (min, max) => Math.floor(Math.random() * (+max - +min + 1)) + +min;

const getRandomArrayItem = (arr) => arr[Math.floor(arr.length * Math.random())];

module.exports = {
  getRandomNumber,
  getRandomArrayItem,
};
