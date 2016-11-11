module.exports = function (app, router, db, models) {

  // /inventory/:resource_type/:resource_id' // resource_id is optional (changes the behaviour of HTTP verbs)

  router.route('/inventory')
    .get(function(req, res) {
      //return all inventory items
      res.json({ status: true, body: 'Return JSON object instead of this string' });
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
        res.json({ status: false, body: "error" });
      }
    })

  router.route('/inventory/:resource_type/:resource_id')
    .get(function(req, res) {
      //return item with req.params.resource_type and req.params.resource_id
    })
    .post(function(req, res) {
      //add item to DB with req.params.resource_type and req.params.resource_id
    })
    .delete(function(req, res) {
      //Delete item from DB req.params.resource_type and req.params.resource_id
    })

}
