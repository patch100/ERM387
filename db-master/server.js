//N.B.: THIS FILE IS JUST FOR TESTING FUNCTIONALITIES IN THE DB

'use strict';
const models = require('./models/index');
const endpoint = require('./endpoint/index');

// App

models.sequelize.sync().then(() => {
  //endpoint testing
  //endpoint.getRoomItems(1).then(aa => console.log(aa));
   //endpoint.addResource({
   // type:"Computer",
   //  is_it: true,
   //  ram : 1,
   // operating_system: "Mac",
    // storage: 2.0
   //}).then(aa => console.log(aa))
  //endpoint.getResourceById(1).then(aa => console.log(aa))
  endpoint.getResourcesByType("Room").then(aa => console.log(aa))
});
