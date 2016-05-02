'use strict';

let jwt = require('jsonwebtoken');

// auth
let jwtAuth = require('../../../lib/jwtAuth');

let config = require('../../../config/local_config');
let errorHandler = require('../../../lib/error');
let sha256 = require('sha256');

let express = require('express');
let router = express.Router();

let Usuario = require('mongoose').model('Usuario');
let PushToken = require('mongoose').model('PushToken');


router.post('/authenticate', function(req, res) {

    let nombre = req.body.nombre;
    let email = req.body.email;
    let clave = req.body.clave;

    Usuario.findOne({nombre: nombre}, function(err, user) {
        if (err) {
            return errorHandler(new Error('Internal server error'), req, res, 500);
        }
        if (!user) {
            return errorHandler(new Error('Authentication failed. User not found'), req, res, 404);
        }
        if (sha256(clave) !== user.clave) {
            return errorHandler(new Error('Authentication failed, Invalid password'), req, res, 401);
        }
        let token = jwt.sign({id: user._id}, config.jwt.secret, { expiresIn: '2 days' });
        res.json({ success: true, token: token });
    });

});

router.get('/authenticate', jwtAuth(), function(req, res) {
    res.json({ success: true, message: 'User authenticated with token!'
    });
});


module.exports = router;