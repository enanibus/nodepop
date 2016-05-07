'use strict';

let mongoose = require('mongoose');

let anuncioSchema = mongoose.Schema({
	nombre: String,
	venta: Boolean,
	precio: Number,
	foto: String,
	tags: [String],
	audit: { type: Date, default: Date.now }
});

anuncioSchema.statics.list = function(filter, start, limit, sort, callback) {
	let query = Anuncio.find(filter);
	query.skip(start);
	query.limit(limit);
	query.sort(sort);
	return query.exec(callback);
};


let Anuncio = mongoose.model('Anuncio', anuncioSchema);