'use strict';

let express = require('express');
let router = express.Router();
let errorHandler = require('../../../lib/error');
let Tag = require('../../../models/Tag');


router.get('/', function (req, res) {

    Tag(function (err, tags) {
        if (err) {
            return errorHandler(new Error('Internal server error. DB_FETCH_ERROR'), req, res, 500);
        }
        res.json({success: true, rows: tags});
    });
});

module.exports = router;
