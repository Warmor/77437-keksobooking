const oneOf = (choices) => {
  return {
    assert(option) {
      return choices.indexOf(option) >= 0;
    },
    message: `should be one of [${choices}]`
  };
};

module.exports = {
  oneOf,
  anyOf(choices) {
    return {
      assert(options) {
        const assertion = oneOf(choices);
        return options.every((it) => assertion.assert(it));
      },
      message: `should be one of [${choices}]`
    };
  },
  inRange(from, to) {
    return {
      assert(number) {
        return number >= from && number <= to;
      },
      message: `should be in range ${from}..${to}`
    };
  },
  textRange(from, to) {
    return {
      assert(text) {
        return text.length >= from && text.length <= to;
      },
      message: `should be in range ${from}..${to}`
    };
  },
  isImage() {
    return {
      assert(image) {
        return image.size > 0 && image.mimetype.startsWith(`image/`);
      },
      message: `should be an image`
    };
  },
  unique() {
    return {
      assert(options) {
        const set = new Set(options);
        return set.size === options.length;
      },
      message: `should be unique`
    };
  },
  isTimeFormat() {
    return {
      assert(timeString) {
        const tempArr = timeString.split(`:`);
        const stringValidate = Array.isArray(tempArr) && tempArr.length === 2;
        const hoursValidate = !isNaN(++tempArr[0]) && tempArr[0] < 24;
        const minutesValidate = !isNaN(++tempArr[1]) && tempArr[1] < 60;
        return stringValidate && hoursValidate && minutesValidate;
      },
      message: `should be format from HH:mm`
    };
  }
};
