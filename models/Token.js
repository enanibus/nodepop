'use strict';

let mongoose = require('mongoose');

let tokenSchema = mongoose.Schema({
    plataforma: {type: String, enum: ['ios', 'android']},
    token: String,
    email: String
});


let Token = mongoose.model('Token', tokenSchema);
