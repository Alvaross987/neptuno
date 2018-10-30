'use strict';

module.exports = function (Pedidos) {
    /**
     * Permite devolver un producto comprado anteriormente
     * @param {number} IdProducto El producto que se quiere devolver
     * @param {number} Cantidad La cantidad de producto a devolver
     * @param {Function(Error, object)} callback
     */

    Pedidos.prototype.devolver = function (IdProducto, Cantidad, callback) {
        var devolucion = this;
        // TODO
        callback(null, devolucion);
    };

};
