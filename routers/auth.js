const express = require('express');
const router = express.Router();
const authHttpHandler = require('../handler/auth')


router.route('/login')
    .post(authHttpHandler.loginUser);

exports.router = router;