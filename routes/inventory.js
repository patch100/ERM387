module.exports = function (app, router, db, models) {

  // /inventory/:resource_type/:resource_id' // resource_id is optional (changes the behaviour of HTTP verbs)

  router.route('/inventory')
    .get(function(req, res) {
      //return all inventory items
      db.getResources()
        .then(resources => res.json({ status: true, body: resources}));
      // try {
      //   models.sequelize.sync().then(() => {
      //     db.getResources()
      //       .then(aa => res.json({
      //         status: true, body: JSON.stringify(aa)})
      //       )
      //     });
      // } catch (e) {
      //   console.log(e);
      //   res.json({status: false, body: {error: "message"}})
      // }
    });

  router.route('/inventory/:resource_type')
    .get(function(req, res) {
      //return items with req.params.resource_type
      db.getResourcesByType(req.params.resource_type)
        .then(resources => res.json({ status: true, body: resources }));
      // try {
      //   models.sequelize.sync(/*{force:true}*/).then(() => {
      //
      //   });
      // } catch (e) {
      //   console.log(e);
      //   res.json({ status: false, body: {error: "message"}});
      // }
    });

  router.route('/inventory/:resource_type/:resource_id')
    .get(function(req, res) {
      //return item with req.params.resource_type and req.params.resource_id
      db.getResourceById(req.params.resource_id)
        .then(resource => res.json({status: true, body: resource}))
      // try {
      //   models.sequelize.sync().then( () => {
      //
      //   });
      // } catch (e) {
      //   console.log(e);
      //   res.json({status: false, body: {error: "message"}});
      // }
    })
    .post(function(req, res) {
<<<<<<< HEAD
      db.addResource(req.body.resource)
        .then(resp => res.json({status: true, body: "Successfully created a new Resource."}));
      //add item to DB with req.params.resource_type and req.params.resource_id
=======
      // checks if the resource has an ID. 
      if(db.getResourceById(req.params.resource_id) == req.body.resource_id){
        // if resource already has ID, then update the resource
        db.modifyResource(req.body.resource)
        .then(resp => res.json({status: true, body: resp}));
      } else { // it is a new resource; add it!
        db.addResource(req.body.resource)
        .then(resp => res.json({status: true, body: resp}));
        //add item to DB with req.params.resource_type and req.params.resource_id
      }
      
>>>>>>> origin/feature/rest
    })
    .delete(function(req, res) {
      db.removeResource(req.params.resource_id)
        .then(resp => res.json({status: true, body: "Successfully deleted the Resouce."}));
      //Delete item from DB req.params.resource_type and req.params.resource_id
    });

}
