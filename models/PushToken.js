'use strict';

let mongoose = require('mongoose');

let pushTokenSchema = mongoose.Schema({
    plataforma: {type: String, enum: ['ios', 'android']},
    token: String,
    usuario: String
});

pushTokenSchema.statics.deleteAll = function(callback){
     PushToken.remove({}, function(err) {
         console.log('Borrando tabla de Notificaciones Push...');
         if (err) {
             console.error('Error en el borrado de la tabla de Notificaciones Push: ', err);
             return cb(err);
         }
         callback(null);
     });
};


let PushToken = mongoose.model('PushToken', pushTokenSchema);
