'use strict';

let express = require('express');
let router = express.Router();
let config = require('../../../config/local_config');
let errorHandler = require('../../../lib/error');
let sha256 = require('sha256');
let Usuario = require('mongoose').model('Usuario');
let jwt = require('jsonwebtoken');
let jwtAuth = require('../../../lib/jwtAuth');
let validator = require('email-validator');


router.post('/authenticate', function(req, res) {

    if (!req.body.email || !req.body.clave) {
        return errorHandler(new Error('Authentication failed. Missing params'), req, res, 400);
    }

    let email = req.body.email;
    let clave = req.body.clave;

    Usuario.findOne({email: email}, function(err, usuario) {
        if (err) {
            return errorHandler(new Error('Internal server error'), req, res, 500);
        }
        if (!usuario) {
            return errorHandler(new Error('Authentication failed. User not found'), req, res, 404);
        }
        if (sha256(clave) !== usuario.clave) {
            return errorHandler(new Error('Authentication failed, Invalid password'), req, res, 401);
        }
        let token = jwt.sign({id: usuario._id}, config.jwt.secret, { expiresIn: '2 days' });
        res.json({ success: true, token: token });
    });

});


router.get('/authenticate', jwtAuth(), function(req, res) {
    res.json({ success: true, message: 'User authenticated with token!'
    });
});


router.post('/registro', function(req, res) {

    if (!req.body.nombre || !req.body.email || !req.body.clave) {
        return errorHandler(new Error('Sigin failed. Missing params'), req, res, 400);
    }

    if (!validator.validate(req.body.email)) {
        return errorHandler(new Error('Sigin failed. Email invalid format'), req, res, 400);
    }

    console.log(req.body);

    new Usuario({

        nombre : req.body.nombre,
        email  : req.body.email,
        clave  : sha256(req.body.clave)

    }).save(function(err, result) {
        if (err) {
            //return res.send(err);
            return errorHandler(new Error('Internal server error'), req, res, 500);
        }
        console.log(result);
        res.json({ success: true, message: result + ' => User inserted successfully!' });
    });
});


module.exports = router;