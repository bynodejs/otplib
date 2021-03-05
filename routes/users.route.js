'use strict';

const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/users.controller');

/**
 * @url BASE_URL/join
 * @method POST
 * @description create user
 */
router.post('/join', createUser);

/**
 * @url BASE_URL/login
 * @method POST
 * @description user login
 */
router.post('/login', loginUser);

module.exports = router;
