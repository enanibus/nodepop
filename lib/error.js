'use strict';

// meter internacionalizacion

function traduce(err, res, status, next) {

    // console.log (err);
    
    // devuelve json del error recibido
    
    // en un futuro debe devolver según el idioma recibido en la petición
    // poner fichero de idiomas 'locales' y código de status para enriquecer la respuesta

    res.status(status).json(err);
    next(err);

};

module.exports = error;


