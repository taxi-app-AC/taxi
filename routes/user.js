const express = require('express');
const router = express.Router();
const User = require('../controllers/UserController');

router.get('/',
    User.getUsers
);

router.get('/:id',
    User.getUser
);

module.exports = router;