'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Anuncio = mongoose.model('Anuncio');
let filtro = require('../../../lib/filtros');
let errorHandler = require('../../../lib/error');
let jwtAuth = require('../../../lib/jwtAuth');


router.get('/', jwtAuth(), function(req, res) {

    let start = parseInt(req.query.start) || 0;
    let limit = parseInt(req.query.limit) || 20;
    let sort = req.query.sort || null;
    let criteria = filtro(req);

    console.log(criteria);
    console.log(req.query.includeTotal);

    if (!req.query.includeTotal) {

        Anuncio.list(criteria, start, limit, sort, function (err, rows) {
            if (err) {
                return errorHandler(new Error('Internal server error. DB_FETCH_ERROR'), req, res, 500);
            }
            res.json({success: true, rows: rows});
        });
    }

    else {

        Anuncio.list(criteria, start, limit, sort,
            function (err, rows) {
                if (err) {
                    return errorHandler(new Error('Internal server error. DB_FETCH_ERROR'), req, res, 500);
                }
                Anuncio.count(criteria, function (err, count) {
                    if (err) {
                        return errorHandler(new Error('Internal server error. DB_FETCH_ERROR'), req, res, 500);
                    }
                    console.log(count);
                    res.json({success: true, total: count, rows: rows});
                });
            });
    }

});


module.exports = router;
