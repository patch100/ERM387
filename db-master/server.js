//N.B.: THIS FILE IS JUST FOR TESTING FUNCTIONALITIES IN THE DB

'use strict';
const models = require('./models/index');
const endpoint = require('./endpoint/index');

// App

models.sequelize.sync().then(() => {
  var user = {first_name:"hello", last_name:"bye"}
  endpoint.updateUser(2,user).then(aa => {
    console.log(JSON.stringify(aa));
  })

});
