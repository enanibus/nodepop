'use strict';

let mongoose = require('mongoose');

let anuncioSchema = mongoose.Schema({
	nombre: String,
	venta: Boolean,
	precio: Number,
	foto: String,
	tags: [String]
});

anuncioSchema.statics.list = function(filter, start, limit, sort, callback) {
	var query = Anuncio.find(filter);
	query.skip(start);
	query.limit(limit);
	query.sort(sort);
	return query.exec(callback);
};

anuncioSchema.statics.deleteAll = function(cb) {
	Anuncio.remove({}, function(err) {
		console.log('Borrando tabla de Anuncios...');
		if (err) {
			console.error('Error en el borrado de la tabla de Anuncios: ', err);
			return cb(err);
		}
		cb(null);
	});
};



let Anuncio = mongoose.model('Anuncio', anuncioSchema);