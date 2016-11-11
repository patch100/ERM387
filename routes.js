exports = module.exports = function (app, router, db, models) {


    router.get('/', function(req, res) {
      res.json({ message: 'Welcome to our API!' });
    });

    var rooms = require('./routes/rooms')(app, router, db, models);
    var users = require('./routes/users')(app, router, db, models);
    var inventory = require('./routes/inventory')(app, router, db, models);
    var login = require('./routes/login')(app, router, db, models);

    app.use('/', router);

};
