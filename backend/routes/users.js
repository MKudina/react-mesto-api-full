const router = require('express').Router();
const {
  createUserValidate, loginValidate, updateUserValidate, updateAvatarValidate, getUserValidate,
} = require('../utils/Validators');
const {
  getUsers, getUser, getUserMe, createUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', getUserValidate, getUser);
router.post('/signup', createUserValidate, createUser);
router.post('/signin', loginValidate, login);
router.patch('/me', updateUserValidate, updateUser);
router.patch('/me/avatar', updateAvatarValidate, updateAvatar);

module.exports = router;
