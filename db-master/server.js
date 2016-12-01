//N.B.: THIS FILE IS JUST FOR TESTING FUNCTIONALITIES IN THE DB

'use strict';
const models = require('./models/index');
const endpoint = require('./endpoint/index');

// App

models.sequelize.sync().then(() => {
  var resource={resourceId:4,startTime:"2017-7-30 13:36:48",endTime:"2017-8-30 13:36:48", user:1}
  endpoint.addResourceReservation(resource, null).then(aa => {
    console.log(JSON.stringify(aa));
  })
});
