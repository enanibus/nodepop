'use strict';

let jwt = require('jsonwebtoken');
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
            return res.status(500).json({success: false, error: err});
        }

        if (!user) {
            return errorHandler(new Error('Authentication failed. User not found'), req, res, 401);
        }

        if (sha256(clave) !== user.clave) {
            //return res.status(401).json({success: false, error: 'Authentication failed, Invalid password'});
            return errorHandler(new Error('Authentication failed, Invalid password'), req, res, 401);
        }

        let token = jwt.sign({id: user._id}, config.jwt.secret, { expiresIn: '2 days' });
        res.json({ success: true, token: token });
    });

});


module.exports = router;