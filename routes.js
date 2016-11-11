exports = module.exports = function (app, router) {


    router.get('/', function(req, res) {
      res.json({ message: 'hooray! welcome to our api!' });
    });

    var rooms = require('./routes/rooms')(app, router);
    var users = require('./routes/users')(app, router);
    var inventory = require('./routes/inventory')(app, router);
    var login = require('./routes/login')(app, router);

    app.use('/', router);

};
