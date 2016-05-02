'use strict';

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Anuncio = mongoose.model('Anuncio');

// auth
let jwtAuth = require('../../../lib/jwtAuth');
//router.use(jwtAuth());

router.get('/', function(req, res) {
    let name = req.query.nombre;
    let start = parseInt(req.query.start) || 0;
    let limit = parseInt(req.query.limit) || null;
    let sort = req.query.sort || null;

    // console.log(name);

    let criteria = {};

    if (typeof name !== 'undefined') {
        criteria.name = name;
    }

    Anuncio.list(criteria, start, limit, sort, function(err, rows) {
        if (err) {
            return res.json({success: false, error: err});
        }

        res.json({success: true, rows: rows});
    });
});


module.exports = router;
