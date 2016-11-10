exports = module.exports = function (app, router) {


    router.get('/', function(req, res) {
      res.json({ message: 'hooray! welcome to our api!' });
    });

    var rooms = require('./routes/rooms')(app, router);
    var users = require('./routes/users')(app, router);
    var inventory = require('./routes/inventory')(app, router);
    var login = require('./routes/login')(app, router);

///////////////////////



    // Example: (you can add /:id at the end of each routes)
    // /rooms/conference
    // /rooms/meeting
    // /rooms/office
    // /rooms/furniture

    // app.use('/rooms/:room_type/:room_id', rooms)  // room_id is optional (changes behaviour of HTTP verbs)
    // app.use('/rooms/:room_type/:room_id', rooms)  // room_id is optional (changes behaviour of HTTP verbs)


    // Example: (you can add /:id at the end of each routes)
    // /users/it/:id
    // /users/employee/:id
    // app.use('/users/:user_type/:user_id', users)  // not sure we need this

    // Example: (you can add /:id at the end of each routes)
    // /inventory/computers
    // /inventory/projectors
    // /inventory/networks
    // /inventory/whiteboards
    // /inventory/flipcharts
    // app.use('/inventory/:resource_type/:resource_id', inventory) // resource_id is optional (changes the behaviour of HTTP verbs)

    app.use('/', router);

/////////////////////////
};
