const { celebrate, Joi } = require('celebrate');

const createUserValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)(w{3,3}\.)?([\w-]+)\.([\w]{1,3})[^\s@]*/),
  }),
});

const getUserValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^(https?:\/\/)(w{3,3}\.)?([\w-]+)\.([\w]{1,3})[^\s@]*/),
  }),
});

const createCardsValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(https?:\/\/)(w{3,3}\.)?([\w-]+)\.([\w]{1,3})[^\s@]*/),
  }),
});

const deleteCardValidate = celebrate({
  params: {
    cardId: Joi.string().length(24).hex(),
  },
});

const likeCardValidate = celebrate({
  params: {
    cardId: Joi.string().length(24).hex(),
  },
});

const dislikeCardValidate = celebrate({
  params: {
    cardId: Joi.string().length(24).hex(),
  },
});

module.exports = {
  createUserValidate,
  getUserValidate,
  loginValidate,
  updateUserValidate,
  updateAvatarValidate,
  createCardsValidate,
  deleteCardValidate,
  likeCardValidate,
  dislikeCardValidate,
};
