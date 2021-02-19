'use strict';

const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/users.controller');

router.get('/', (req, res, next) => {
    res.sendStatus(200);
});

router.post('/join', createUser);

router.post('/login', loginUser);

module.exports = router;
