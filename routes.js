var Cookies = require('cookies')

exports = module.exports = function(app, router, db, jwt) {

    router.get('/', function(req, res) {
        res.json({
            message: 'Welcome to our API!'
        });
    });

    function requireAuthentication(req, res) {
        var cookies = new Cookies(req, res)
        if (typeof cookies.get('token') !== "undefined") { // ****************************
                // check header or url parameters or post parameters for token
            var token = cookies.get('token');
            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({
                        status: false,
                        body: { error: 'Failed to authenticate token.' }
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                status: false,
                body: { error: "Request Failed" }
            })
        }
    }



    app.all('/inventory', requireAuthentication)
    app.all('/rooms', requireAuthentication)
    app.all('/users', requireAuthentication)
    app.all('/reservations', requireAuthentication)

    var rooms = require('./routes/rooms')(app, router, db);
    var users = require('./routes/users')(app, router, db);
    var inventory = require('./routes/inventory')(app, router, db);
    var login = require('./routes/login')(app, router, db, jwt);
    var reservations = require('./routes/reservations')(app, router, db);

    app.use('/', router);

};
