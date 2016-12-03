'use strict';
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();

// Where you call other files such as controllers and routings. next to "app" add any other packages you import that are required in the controllers
// // DB testing
const models = require('./db-master/models/index');
const db = require('./db-master/endpoint/index');
require('./routes')(app, router, db);



models.sequelize.sync().then(function(){
    app.listen(port)
    console.log('Magic happens on port ' + port);
})





exports = module.exports = app;
