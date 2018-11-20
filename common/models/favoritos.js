'use strict';

module.exports = function(Favoritos) {
    /**
     * Devuelve los productos favoritos del cliente autenticado
     * @param {object} objetoContexto El objeto de contexto
     * @param {Function(Error, array)} callback
     */

    Favoritos.misFavoritos = function (objetoContexto, callback) {
        var Cliente = Favoritos.app.models.Clientes;
        
        Cliente.findById(objetoContexto.req.accessToken.userId, function(err, usuarioAutenticado){
            if (err) callback(err);
            
            usuarioAutenticado.productosFav(function(err, favoritos){
                if (err) callback(err);
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

};
