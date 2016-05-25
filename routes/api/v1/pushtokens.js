'use strict';

let express = require('express');
let router = express.Router();
let errorHandler = require('../../../lib/error');
let Token = require('mongoose').model('Token');
let plataformas = require('../../../config/local_config').plataformas;
let validator = require('email-validator');


router.post('/', function (req, res) {

    if (!req.body.plataforma || !req.body.token || !req.body.email) {
        return errorHandler(new Error('Token push failed. MISSING_PARAMS'), req, res, 400);
    }

    if (plataformas.indexOf(req.body.plataforma) == -1) {
        return errorHandler(new Error('Token push failed. PLATFORM_NOT_VALID'), req, res, 400);
    }

    if (!validator.validate(req.body.email)) {
        return errorHandler(new Error('Token push failed. EMAIL_INVALID_FORMAT'), req, res, 400);
    }

    new Token({

        plataforma: req.body.plataforma,
        token: req.body.token,
        email: req.body.email

    }).save(function (err, result) {
        if (err) {
            return errorHandler(new Error('Internal server error. DB_INSERT_ERROR'), req, res, 500);
        }
        res.json({success: true, message: result + ' => Token pushed successfully!'});
    });
});


module.exports = router;
