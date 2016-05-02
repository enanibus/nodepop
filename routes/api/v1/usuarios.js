'use strict';

let jwt = require('jsonwebtoken');
let config = require('../../../config/local_config');
let sha256 = require('sha256');

let express = require('express');
let router = express.Router();

let Usuario = require('mongoose').model('Usuario');
let PushToken = require('mongoose').model('PushToken');

require('../../../lib/error');

// auth
let jwtAuth = require('../../../lib/jwtAuth');


router.post('/authenticate', function(req, res) {

    let nombre = req.body.nombre;
    let email = req.body.email;
    let clave = req.body.clave;

    Usuario.findOne({nombre: nombre}, function(err, user) {
        if (err) {
            return res.status(500).json({success: false, error: err});
        }

        if (!user) {
            return res.status(401).json({success: false, error: 'Authentication failed. User not found'});
        }

        if (sha256(clave) !== user.clave) {
            return res.status(401).json({success: false, error: 'Authentication failed, Invalid password'});
        }
        // match!
        var token = jwt.sign({id: user._id}, config.jwt.secret, { expiresIn: '2 days' });
        res.json({ success: true, token: token });
    });

});


module.exports = router;