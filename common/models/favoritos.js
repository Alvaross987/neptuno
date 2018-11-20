'use strict';

module.exports = function (Favoritos) {
    /**
     * Devuelve los productos favoritos del cliente autenticado
     * @param {object} objetoContexto El objeto de contexto
     * @param {Function(Error, array)} callback
     */

    Favoritos.misFavoritos = function (objetoContexto, callback) {
        var Cliente = Favoritos.app.models.Clientes;

        Cliente.findById(objetoContexto.req.accessToken.userId, function (err, usuarioAutenticado) {
            if (err)
                callback(err);

            usuarioAutenticado.productosFav(function (err, favoritos) {
                if (err)
                    callback(err);
                console.info(err);
                console.info(favoritos);
                callback(null, favoritos);
            });
        });
//        var idUsuario = objetoContexto.req.accessToken.userId;
//        
//        Favoritos.find({
//            where: {
//                clienteId: idUsuario
//            },
//            include: {
//                relation: 'productos',
//                scope: {
//                    fields: ['NombreProducto']
//                }
//            }
//        }, function(err, misFavoritos){
//            callback(err, misFavoritos);
//        });
    };

    Favoritos.afterRemote('create', function (context, favorito, next) {
        // Buscar al cliente autenticado
        favorito.clientes(function (err, cliente) {
            cliente.pedidos({
                order: 'FechaPedido ASC',
                include: 'detallesPedidos'
            },
            function (err, pedidos) {
                var ultimaFecha = null;
                pedidos.forEach(function(pedido){
                    var miPedido = pedido.toJSON();
                    var detallesPedidos = miPedido.detallesPedidos;
                    
                    detallesPedidos.forEach(function(detallePedido){
                        if(detallePedido.IdProducto === favorito.productoId){
                            ultimaFecha = pedido.FechaPedido;
                        }
                    });
                });
                favorito.ultimaFecha = ultimaFecha;
                favorito.save(function(err, favorito){
                    next();                    
                });
            });
        });

    });

};
