//N.B.: THIS FILE IS JUST FOR TESTING FUNCTIONALITIES IN THE DB

'use strict';
const models = require('./models/index');
const endpoint = require('./endpoint/index');

// App

models.sequelize.sync().then(() => {
  var room={roomId:1,startTime:"2016-11-30 13:36:48",endTime:"2016-12-30 13:36:48"}
  endpoint.addRoomReservation(room).then(aa => {
    console.log(JSON.stringify(aa));
  })
});
