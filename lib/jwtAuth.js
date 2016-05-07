'use strict';

/**
 * JWT auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/api-requiring-auth', jwtAuth());
 *
 * @returns {function} Express 4 middleware
 */

let jwt = require('jsonwebtoken');
let configJWT = require('../config/local_config').jwt;
let errorHandler = require('./error');

module.exports = function () {

    return function (req, res, next) {

        // check header or url parameters or post parameters for token
        let token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, configJWT.secret, function (err, decoded) {
                if (err) {
                    return errorHandler(new Error('FAILED_TO_AUTHENTICATE_TOKEN'), req, res, 401);
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            return errorHandler(new Error('NO_TOKEN_PROVIDED'), req, res, 403);
        }
    };
};
