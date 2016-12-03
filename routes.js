exports = module.exports = function (app, router, db, models) {


  router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our API!' });
  });




  function requireAuthentication(){
    if (req.cookies.token){ // ****************************
      router.use(function(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['token'] || req.cookies.token;

        // decode token
        if (token) {
          // verifies secret and checks exp
          jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
              return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
              // if everything is good, save to request for use in other routes
              req.decoded = decoded;
              next();
            }
          });

        } else {
          // if there is no token, return an error
          return res.status(403).send({
            success: false,
            message: 'No token provided.'
          });

        }
      });

    }
  }

  app.all('/inventory', requireAuthentication)
  app.all('/rooms', requireAuthentication)

  var login = require('./routes/login')(app, router, db, models);
  var rooms = require('./routes/rooms')(app, router, db, models);
  var users = require('./routes/users')(app, router, db, models);
  var inventory = require('./routes/inventory')(app, router, db, models);

  app.use('/', router);

};
