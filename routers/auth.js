const express = require('express');
const router = express.Router();
const authHttpHandler = require('../handler/auth')

router.route('/signup')
    .post(authHttpHandler.createUser);

router.route('/login')
    .post(authHttpHandler.loginUser);

exports.router = router;