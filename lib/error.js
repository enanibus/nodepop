'use strict';

let acceptedLanguages = require('../config/local_config').languages;
let i18n = new (require('i18n-2'))({
    // setup some locales - other locales default to the first locale
    locales: acceptedLanguages
});

function errorHandler(err, req, res, sta) {

    let lang = req.query.lang || req.lang || 'en';

    i18n.setLocale(lang);
    err.message = i18n.__(err.message);

    console.error(err);
    res.status(sta).json({ success: false, error: err.message });
    
}

module.exports = errorHandler;


