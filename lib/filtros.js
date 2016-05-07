'use strict';

function filtro(req) {

    let criteria = {};

    if (req.query.tag) {
        criteria.tags = { $all : req.query.tag };
    }

    if (req.query.venta) {
        criteria.venta = req.query.venta;
    }

    if (req.query.nombre) {
        criteria.nombre = new RegExp('^' + req.query.nombre.toLowerCase() + '.*', 'i');
    }

    if (req.query.precio) {

        let rango = req.query.precio.split('-');

        if (rango.length === 1) {
            criteria.precio = rango[0];
        }
        else if (rango.length === 2) {
            if (!rango[0]) {
                criteria.precio = { $lt: rango[1] };
            }
            else if (!rango[1]) {
                criteria.precio = { $gt: rango[0] };
            }
            else {
                criteria.precio = { $gte: rango[0], $lte: rango[1]};
            }
        }
    }

    return criteria;
}

module.exports = filtro;

