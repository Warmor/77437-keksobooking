const {Router} = require(`express`);
const multer = require(`multer`);
const bodyParser = require(`body-parser`);
const {validateSchema} = require(`../util/validator`);
const offerSchema = require(`./validation`);
const ValidationError = require(`../error/validation-error`);
const NotFoundError = require(`../error/not-found-error`);
const BadRequestError = require(`../error/bad-request-error`);
const createStreamFromBuffer = require(`../util/buffer-to-stream`);
const dataRenderer = require(`../util/data-renderer`);
const asyncHelper = require(`../util/asyncHelper`);
const decorator = require(`../util/decorator`);
const logger = require(`./../../logger`);

const offersRouter = new Router();
offersRouter.use(bodyParser.json());
const upload = multer({storage: multer.memoryStorage()});

offersRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

const toPage = async (cursor, skip = 0, limit = 20) => {
  return {
    data: (await (cursor.skip(skip).limit(limit).toArray())).map((item)=> decorator.toSend(item)),
    skip,
    limit,
    total: await cursor.count()
  };
};

const getAllOffers = asyncHelper(async (req, res) => {
  const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;
  if (isNaN(skip) || isNaN(limit)) {
    throw new BadRequestError(`skip or limit should be number`);
  }
  res.send(await toPage(await offersRouter.offersStore.getAllOffers(), skip, limit));
});

const saveOffer = asyncHelper(async (req, res) => {

  const data = decorator.toSave(req.body);
  const errors = validateSchema(data, offerSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  data.date = Date.now();
  const avatar = req.file;

  if (avatar) {
    const avatarInfo = {
      path: `/api/offers/${data.date}/avatar`,
      mimetype: avatar.mimetype
    };

    await offersRouter.imageStore.save(avatarInfo.path, createStreamFromBuffer(avatar.buffer));
    data.avatar = avatarInfo.path;
    data.avatarMimetype = avatarInfo.mimetype;
  }
  const response = await offersRouter.offersStore.save(data);
  res.send(decorator.toSend(response.ops[0]));
});

const getOfferByDate = asyncHelper(async (req, res) => {
  const date = parseInt(req.params.date, 10);
  if (isNaN(date) || date.toString().length !== 13) {
    throw new BadRequestError(`Date should be number and contains 13 characters`);
  }
  const offersPromise = await offersRouter.offersStore.getAllOffers();
  const offers = await offersPromise.toArray();
  const find = offers.find((it) => it.date === date);
  if (!find) {
    throw new NotFoundError(`Offer with this date is not exist`);
  }
  const offer = offers.find((it) => it.date === date);
  res.json(decorator.toSend(offer));
});

const getAvatar = asyncHelper(async (req, res) => {
  const date = Number(req.params[`date`].toLowerCase());

  if (isNaN(date) || date.toString().length !== 13) {
    throw new BadRequestError(`Date should be number and contains 13 characters`);
  }
  const offersPromise = await offersRouter.offersStore.getAllOffers();
  const offers = await offersPromise.toArray();
  const offer = offers.find((it) => it.date === date);

  if (!offer) {
    throw new NotFoundError(`Offer with this date is not exist`);
  }
  const avatar = offer.avatar;

  if (!avatar) {
    throw new NotFoundError(`"${offer.name}" didn't upload avatar`);
  }

  const {info, stream} = await offersRouter.imageStore.get(avatar);
  if (!info) {
    throw new NotFoundError(`File was not found`);
  }
  res.set(`content-type`, offer.avatarMimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  stream.pipe(res);
});


offersRouter.get(`/`, getAllOffers);
offersRouter.post(``, upload.single(`avatar`), saveOffer);
offersRouter.get(`/:date`, getOfferByDate);
offersRouter.get(`/:date/avatar`, getAvatar);

offersRouter.use((exception, req, res, next) => {
  if (exception instanceof ValidationError || exception instanceof NotFoundError || exception instanceof BadRequestError) {
    dataRenderer.renderException(req, res, exception);
    next();
    return false;
  }
  logger.error(exception);
  res.status(500).send({
    error: `Internal Error`,
    errorMessage: `Server has fallen into unrecoverable problem.`
  }).end();
  return false;
});

module.exports = (offersStore, imageStore) => {
  offersRouter.offersStore = offersStore;
  offersRouter.imageStore = imageStore;
  return offersRouter;
};
