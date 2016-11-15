exports = module.exports = function (app, router, db) {


    router.get('/', function(req, res) {
      res.json({ message: 'Welcome to our API!' });
    });

    var rooms = require('./routes/rooms')(app, router, db);
    var users = require('./routes/users')(app, router, db);
    var inventory = require('./routes/inventory')(app, router, db);
    var login = require('./routes/login')(app, router, db);

    app.use('/', router);

};
