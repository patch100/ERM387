//N.B.: THIS FILE IS JUST FOR TESTING FUNCTIONALITIES IN THE DB

'use strict';
const models = require('./models/index');
GLOBAL.endpoint = require('./endpoint/index');

// App

models.sequelize.sync().then(() => {
  require('./data/testCases.js');
});
