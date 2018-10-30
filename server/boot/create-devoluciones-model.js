module.exports = function(app) {
  //data sources
  var mysqlDs = app.dataSources.mysqlDs;
      mysqlDs.automigrate('Devoluciones', function(err) {
      if (err) throw(err);
      
    });
};
