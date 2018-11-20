module.exports = function(app) {
    
    if(process.env.AUTOMIGRATE == 'devoluciones') {
        //data sources
        var mysqlDs = app.dataSources.mysqlDs;
        var db = app.dataSources.db;

          mysqlDs.automigrate('Devoluciones', function(err) {
            if (err) throw(err);

          });
          db.automigrate(null, function(err) {
            if (err) throw(err);

          });
          mysqlDs.autoupdate('Clientes', function(err){
            if (err) throw(err);
          });
    }
    
    if(process.env.PASSWORD == 'true') {
        //data sources
        var Clientes = app.models.Clientes;

          Clientes.generatePasswords(function(err) {
            if (err) throw(err);
          });
    }

};
