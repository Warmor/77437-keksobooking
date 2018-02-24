const {Router} = require(`express`);
const multer = require(`multer`);
const bodyParser = require(`body-parser`);
const fs = require(`fs`);

const offersRouter = new Router();
const upload = multer({storage: multer.memoryStorage()});
offersRouter.use(bodyParser.json());

let offers = JSON.parse(fs.readFileSync(`${process.cwd()}/covert-data.json`));

const getOffersList = (data, skip, limit) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length
  };
};
const getOfferSingle = (date) => {
  return {
    data: offers.find((it) => it.date === date)
  };
};
const getAuthorAvatar = (date) => {
  return {
    data: offers.find((it) => it.date === date).author.avatar
  };
};

offersRouter.get(``, (req, res) => {
  const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;
  if (isNaN(skip) || isNaN(limit)) {
    res.status(400);
    res.send({
      error: `Validation Error`,
      fieldName: `skip or limit`,
      errorMessage: `skip or limit should be number`
    });
  } else {
    res.send(getOffersList(offers, skip, limit));
  }
  res.end();
});

offersRouter.post(``, upload.single(`avatar`), (req, res) => {
  res.send(req.body);
});

offersRouter.get(`/:date`, (req, res) => {
  const date = parseInt(req.params.date, 10);
  if (isNaN(date) || date.toString().length !== 13) {
    res.status(400);
    res.send({
      error: `Bad request`,
      fieldName: `date params`,
      errorMessage: `date should be number and contains 13 characters`
    });
    res.end();
    return false;
  }
  const offer = getOfferSingle(date);
  if (!offer.data) {
    res.status(404);
  } else {
    res.send(offer);
  }
  res.end();
  return true;
});

offersRouter.get(`/:date/avatar`, (req, res) => {
  const date = parseInt(req.params.date, 10);
  if (isNaN(date) || date.toString().length !== 13) {
    res.status(400);
    res.send({
      error: `Bad request`,
      fieldName: `date params`,
      errorMessage: `date should be number and contains 13 characters`
    });
    res.end();
    return false;
  }
  const avatar = getAuthorAvatar(date);
  if (avatar !== ``) {
    res.send(avatar);
  } else {
    res.status(404);
  }
  res.end();
  return true;
});


offersRouter.use((exception, req, res) => {
  console.log(exception);
  res.status(500);
  res.send({
    error: `Internal Error`,
    errorMessage: `Server has fallen into unrecoverable problem.`
  });
  res.end();
});


module.exports = offersRouter;
