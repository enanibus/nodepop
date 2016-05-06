'use strict';

let express = require('express');
let router = express.Router();
let config = require('../../../config/local_config');
let errorHandler = require('../../../lib/error');
let PushToken = require('mongoose').model('PushToken');
let plataformas = require('../../../config/local_config').plataformas;
let validator = require('email-validator');


router.post('/', function(req, res) {

    if (!req.body.plataforma || !req.body.token || !req.body.email) {
        return errorHandler(new Error('Token push failed. Missing params'), req, res, 400);
    }

    console.log(req.body.plataforma);
    console.log(plataformas);
    let pos = plataformas.indexOf(req.body.plataforma);
    console.log(pos);
    if (pos == -1) {
        return errorHandler(new Error('Token push failed. Platform not valid'), req, res, 400);
    }

    if (!validator.validate(req.body.email)) {
        return errorHandler(new Error('Token push failed. Email invalid format'), req, res, 400);
    }


    console.log('req.body: ');
    console.log(req.body);

    let token = new PushToken({ plataforma: req.body.plataforma, token: req.body.token, email: req.body.email });
    

    new PushToken ({

        plataforma : req.body.plataforma,
        token  : req.body.token,
        email  : req.body.email

    }).save(function(err, result) {
        if (err) {
            //return res.send(err);
            return errorHandler(new Error('Internal server error'), req, res, 500);
        }
        console.log(result);
        res.json({ success: true, message: result + ' => Token pushed successfully!' });
    });
});


module.exports = router;