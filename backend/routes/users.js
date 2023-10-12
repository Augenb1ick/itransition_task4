const router = require('express').Router();

const {
  getCurrentUser, getAllUsers, blockUsers, unblockUsers, deleteUsers,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/all', getAllUsers);
router.delete('/', deleteUsers);
router.patch('/block/', blockUsers);
router.patch('/unblock/', unblockUsers);

module.exports = router;
