'use strict';

// pendiente de resolver la internacionalizacion, de momento se devuelven errores en inglés

function errorHandler(err, req, res, sta) {
    
    // devuelve json del error recibido

    // en un futuro debe devolver según el idioma recibido en la petición: req.lang
    // poner fichero de idiomas 'locales' y mensajes con status para enriquecer la respuesta
    // traducir por clave del error en tabla de literales
    // ejemplo;
    // errorHandler(new Error('USER_NOT_FOUND'), req, res, 401);

    console.log('ErrorHandler devuelve error : ' + err.message);
    console.log('ErrorHandler devuelve status: ' + sta);
    res.status(sta).json({ success: false, error: err.message });

};

module.exports = errorHandler;


