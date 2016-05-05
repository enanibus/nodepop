'use strict';

let mongoose = require('mongoose');

let pushTokenSchema = mongoose.Schema({
    plataforma: {type: String, enum: ['ios', 'android']},
    token: String,
    email: String
});


let PushToken = mongoose.model('PushToken', pushTokenSchema);
