//N.B.: THIS FILE IS JUST FOR TESTING FUNCTIONALITIES IN THE DB

'use strict';
const models = require('./models/index');
const endpoint = require('./endpoint/index');

// App

models.sequelize.sync().then(() => {
  endpoint.getRooms().then(aa => {
    console.log(JSON.stringify(aa));
  })
});
