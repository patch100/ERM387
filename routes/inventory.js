module.exports = function (app, router, db, models) {

  // /inventory/:resource_type/:resource_id' // resource_id is optional (changes the behaviour of HTTP verbs)

  router.route('/inventory')
    .get(function(req, res) {
      //return all inventory items
      try {
        models.sequelize.sync().then(() => {
          db.getResources()
            .then(aa => res.json({
              status: true, body: JSON.stringify(aa)})
            )
          });
      } catch (e) {
        console.log(e);
        res.json({status: false, body: {error: "message"}})
      }
    });

  router.route('/inventory/:resource_type')
    .get(function(req, res) {
      //return items with req.params.resource_type
      try {
        models.sequelize.sync(/*{force:true}*/).then(() => {
          db.getResourcesByType(req.params.resource_type)
            .then(aa => res.json({ status: true, body: aa }))
        });
      } catch (e) {
        console.log(e);
        res.json({ status: false, body: {error: "message"}});
      }
    });

  router.route('/inventory/:resource_type/:resource_id')
    .get(function(req, res) {
      //return item with req.params.resource_type and req.params.resource_id
      try {
        models.sequelize.sync().then( () => {
          db.getResourcesById(req.params.resource_id)
            .then(aa => res.json({status: true, body: JSON.stringify(aa)}))
        });
      } catch (e) {
        console.log(e);
        res.json({status: false, body: {error: "message"}});
      }
    })
    .post(function(req, res) {
      //add item to DB with req.params.resource_type and req.params.resource_id
    })
    .delete(function(req, res) {
      //Delete item from DB req.params.resource_type and req.params.resource_id
    });

}
