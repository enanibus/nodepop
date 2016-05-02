'use strict';

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Anuncio = mongoose.model('Anuncio');
let errorHandler = require('../../../lib/error');

// auth
let jwtAuth = require('../../../lib/jwtAuth');
//router.use(jwtAuth());

router.get('/', function(req, res) {

    let start = parseInt(req.query.start) || 0;
    let limit = parseInt(req.query.limit) || null;
    let sort = req.query.sort || null;
    let criteria = {};

    if (typeof req.query.nombre !== 'undefined') {
        criteria.nombre = req.query.nombre;
    }
    console.log(criteria.nombre);

    Anuncio.list(criteria, start, limit, sort, function(err, rows) {
        if (err) {
            return errorHandler(new Error('Internal server error'), req, res, 500);
        }
        res.json({success: true, rows: rows});
    });
});


module.exports = router;
