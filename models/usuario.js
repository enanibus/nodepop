'use strict';

let mongoose = require('mongoose');

let usuarioSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    email: { type: String, required: true },
    clave: { type: String, required: true},
    audit: { type: Date, default: Date.now }
});

usuarioSchema.index({ 'email': 1 }, { unique: true });


let Usuario = mongoose.model('Usuario', usuarioSchema);