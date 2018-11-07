'use strict';

module.exports = function (Pedidos) {

  Pedidos.beforeRemote('create', function(context, pedido, next) {
    context.args.data.FechaPedido = Date.now();
    context.args.data.IdCliente = context.req.accessToken.userId;
    next();
  });
  
    Pedidos.beforeRemote('prototype.devolver', function (ctx, pedido, next) {
        pedido = ctx.instance;
        pedido.detallesPedidos({
            where: {IdProducto: ctx.args.IdProducto}
        }, function(err, filasDetalles){
            if (err) next(err);
            if(filasDetalles.length == 0) {
                next(new Error('El producto no está en ese pedido'));
            } else {
                next();
            }
        });
        
    });

    /**
     * Permite devolver un producto comprado anteriormente
     * @param {number} IdProducto El producto que se quiere devolver
     * @param {number} Cantidad La cantidad de producto a devolver
     * @param {Function(Error, object)} callback
     */

    Pedidos.prototype.devolver = function (IdProducto, Cantidad, callback) {
        var pedido = this;
        var data = {
            productosId: IdProducto,
            Cantidad: Cantidad
        };

        pedido.devoluciones.create(data,
                function (err, devolucion) {
                    callback(err, devolucion);
                });
    };

};
