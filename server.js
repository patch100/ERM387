'use strict';
var express = require('express');
var session = require('express-session');
var SessSequelize = require('sequelize');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken')

var path = require('path');
app.use(express.static('inventory'));

var sessq = new SessSequelize(
    "database", "username", "password", { "dialect": "sqlite", "storage": "./session.sqlite" });

// configure app to use bodyParser() and session()
// this will let us get the data from a POST
app.set('superSecret', 'thisprojectisawesome')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'soen387secret',
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sessq,
        checkExpirationInterval: 15*60*1000,
        expiration: 24*60*60*1000
    })
}));

sessq.sync();

// Allow origins
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:8080/");
    res.header('Access-Control-Allow-Origin', "http://localhost:8081");
    res.header('Access-Control-Allow-Origin', "http://162.253.53.97/");
    res.header('Access-Control-Allow-Origin', "https://localhost:8080/");
    res.header('Access-Control-Allow-Origin', "https://localhost:8081");
    res.header('Access-Control-Allow-Origin', "https://162.253.53.97/");
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

var port = process.env.PORT || 8080; // set our port

var router = express.Router();

// Where you call other files such as controllers and routings. next to "app" add any other packages you import that are required in the controllers
// // DB testing
const models = require('./db-master/models/index');
const db = require('./db-master/endpoint/index');
require('./routes')(app, router, db, jwt);


models.sequelize.sync().then(function() {
    app.listen(port)
    console.log('Magic happens on port ' + port);
})


exports = module.exports = app;
