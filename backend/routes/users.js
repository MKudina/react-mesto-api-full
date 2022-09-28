const router = require('express').Router();
const {
  updateUserValidate, updateAvatarValidate, getUserValidate,
} = require('../utils/Validators');
const {
  getUsers, getUser, getUserMe, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', getUserValidate, getUser);
router.patch('/me', updateUserValidate, updateUser);
router.patch('/me/avatar', updateAvatarValidate, updateAvatar);

module.exports = router;
