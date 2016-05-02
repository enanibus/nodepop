'use strict';

let mongoose = require('mongoose');

let usuarioSchema = mongoose.Schema({
    nombre: String,
    email: { type: String, index: true },
    clave: String
});

usuarioSchema.statics.deleteAll = function(cb){
     Usuario.remove({}, function(err) {
         console.log('Borrando tabla de Usuarios...');
         if (err) {
             console.error('Error en el borrado de la tabla de Usuarios: ', err);
             return cb(err);
         };
         cb(null);
     });
};

// usuarioSchema.index({'email':1},{ unique: true });


let Usuario = mongoose.model('Usuario', usuarioSchema);