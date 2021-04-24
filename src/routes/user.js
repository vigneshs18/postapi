const express = require('express');

const UserController = require('../controllers/user');
// const verifyEmail = require('../middlewares/verifyEmail');
// const verifyUser = require('../middlewares/verifyUser');
// const verifyAdmin = require('../middlewares/verifyAdmin');

const router = express.Router();

router.post('/signup', UserController.createUser);
router.post('/login', UserController.loginUser);

module.exports = router;
