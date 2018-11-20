'use strict';

module.exports = function (DetallesPedidos) {

  DetallesPedidos.afterRemote('create', function(context, detallePedido, next) {
    detallePedido.pedido(function(err, pedido){
        if (err) next(err);
        var idCliente = pedido.IdCliente;
        var Favoritos = DetallesPedidos.app.models.Favoritos;
        
        Favoritos.findOne({
            where: {
                and: [
                    {clienteId: idCliente},
                    {productoId: detallePedido.IdProducto}
                ]
            }
        }, function(err, favorito){
            if (err) next(err);
            
            if(favorito){
                favorito.ultimaFecha = pedido.FechaPedido;
                favorito.save(function(err){
                    next();
                });
            } else {
                next();
            }
        });
    });
  });
};