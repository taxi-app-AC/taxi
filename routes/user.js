const express = require('express');
const router = express.Router();
const User = require('../controllers/UserController');

router.get('/',
    User.getUsers
);

router.get('/:id',
    User.getUser
);

router.get('/:id/:active',
    User.changeActive
);

router.get('/accept/:id/:request',
    User.acceptOrDecline
);

module.exports = router;