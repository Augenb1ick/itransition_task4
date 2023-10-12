const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const auth = require('../middlewares/auth');
const authRoutes = require('./auth');

// router.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('server will now fall');
//   }, 0);
// });

router.use(authRoutes);

router.use(auth);

router.use('/users', require('./users'));

router.use('/*', (req, res, next) => next(new NotFoundError('Route does not exist.')));

module.exports = router;
