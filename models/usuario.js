'use strict';

let mongoose = require('mongoose');

let usuarioSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    email: { type: String, required: true },
    clave: { type: String, required: true}
});

usuarioSchema.statics.deleteAll = function(callback){
     Usuario.remove({}, function(err) {
         console.log('Borrando tabla de Usuarios...');
         if (err) {
             console.error('Error en el borrado de la tabla de Usuarios: ', err);
             return cb(err);
         };
         callback(null);
     });
};

usuarioSchema.index({ 'email': 1 }, { unique: true });


let Usuario = mongoose.model('Usuario', usuarioSchema);