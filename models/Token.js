'use strict';

let mongoose = require('mongoose');
let plataformas = require('../config/local_config').plataformas;

let tokenSchema = mongoose.Schema({
    plataforma: {type: String, enum: plataformas, required: true},
    token: { type: String, required: true },
    email: { type: String, required: true },
    audit: { type: Date, default: Date.now }
});


let Token = mongoose.model('Token', tokenSchema);
