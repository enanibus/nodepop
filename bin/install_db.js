'use strict';

let async = require('async');

// Hash
let sha256 = require('sha256');
// let secret = require('../config/local_config').jwt.secret;

// Database
require('../lib/connectDatabase');
let mongoose = require('mongoose');
let conn = mongoose.connection;

// Models
require('../models/Anuncio');
require('../models/Usuario');
require('../models/Token');

// Entities
let Anuncio = mongoose.model('Anuncio');
let Usuario = mongoose.model('Usuario');
let Token = mongoose.model('Token');

// Ficheros
let fs = require('fs');
let path = require('path');
let ficheroAnuncios = path.join('config', 'anuncios.json');


async.series([

        function(callback) {
            Anuncio.remove({}, function(err) {
                console.log('Borrando tabla de Anuncios...');
                if (err) {
                    console.error('Error en el borrado de la tabla de Anuncios: ', err);
                    return callback(err);
                }
                console.log('Hecho.');
                callback(null, 'bajaAnuncios');
            });
        },

        function(callback) {
            Usuario.remove({}, function(err) {
                console.log('Borrando tabla de Usuarios...');
                if (err) {
                    console.error('Error en el borrado de la tabla de Usuarios: ', err);
                    return callback(err);
                }
                console.log('Hecho.');
                callback(null, 'bajaUsuarios');
            });
        },

        function(callback) {
            Token.remove({}, function(err) {
                console.log('Borrando tabla de Notificaciones Push...');
                if (err) {
                    console.error('Error en el borrado de la tabla de Notificaciones Push: ', err);
                    return callback(err);
                }
                console.log('Hecho.');
                callback(null, 'bajaPushTokens');
            });
        },

        function(callback) {
            fs.readFile(ficheroAnuncios, {encoding: 'utf8'}, function(err, data) {
                if (err) {
                    return callback(err);
                }
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    return callback(e);
                }
                async.each(data.anuncios, (function(item) {
                    new Anuncio(item).save(function(err, nuevoAnuncio) {
                        if (err) {
                            console.log('Error al crear anuncio', err);
                            return callback(err);
                        }
                        console.log('Anuncio ' + nuevoAnuncio.nombre + ' creado');
                    });
                }));
                callback(null, 'altaAnuncios');
            });
        },

        function(callback) {
            let item = new Usuario();
            item.nombre = 'jacobo';
            item.email = 'jacobo@gmail.com'
            item.clave = sha256('jacobo');
            new Usuario(item).save(function (err, nuevoUsuario) {
                if (err) {
                    console.log('Error al crear usuario', err);
                    return callback(err);
                }
                console.log('Usuario ' + nuevoUsuario.nombre + ' creado');
                callback(null, 'altaUsuario');
            });
        }

    ], function(err, results) {
        if (err) {
            console.error('Error al instalar la BD: ', err);
            return;
        }
        console.log(results);
        conn.close();
        console.log('--------------------------------------------');
        console.log('Instalacion base de datos nodepop terminada.');
    }
);

