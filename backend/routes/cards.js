const router = require('express').Router();
const {
  createCardsValidate, deleteCardValidate, likeCardValidate, dislikeCardValidate,
} = require('../utils/Validators');
const {
  getCards, createCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCardsValidate, createCards);
router.delete('/:cardId', deleteCardValidate, deleteCard);
router.put('/:cardId/likes', likeCardValidate, likeCard);
router.delete('/:cardId/likes', dislikeCardValidate, dislikeCard);

module.exports = router;
