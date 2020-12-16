const router = require('express').Router();
const { getMyUser } = require('../controllers/users');

router.get('/me', getMyUser);

module.exports = router;
