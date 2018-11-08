'use strict';

module.exports = function (Clientes) {
    Clientes.generatePasswords = function(callback) {
        // Recuperamos todos los clientes de la tabla Clientes
        Clientes.find(null, function(err,clientes){
            if(err) callback(err);
            
            // Por cada uno de los clientes
            // rellenamos los datos necesarios
            // en principio debemos poner la contraseña en texto claro
            clientes.forEach(cliente => {
                cliente.updateAttributes({
                    username: cliente.IdCliente,
                    email: cliente.IdCliente + '@iesdosmares.ies',
                    password: 'alumno'
                }, function(err, cliente){
                    if (err) callback(err);
                });
            });
            callback(null, clientes);
        });
    }
};
