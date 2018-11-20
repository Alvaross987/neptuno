module.exports = function (app) {

    if (process.env.AUTOMIGRATE == 'favoritos') {
        //data sources
        var mysqlDs = app.dataSources.mysqlDs;

        mysqlDs.automigrate('Favoritos', function (err) {
            if (err)
                throw(err);

        });
    }
};
