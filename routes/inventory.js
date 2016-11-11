module.exports = function (app, router) {

  // /inventory/:resource_type/:resource_id' // resource_id is optional (changes the behaviour of HTTP verbs)

  router.route('/inventory')
    .get(function(req, res) {
      //return all inventory items
      res.json({ status: true, body: 'Return JSON object instead of this string' });
    });

  router.route('/inventory/:resource_type/:resource_id')
    .get(function(req, res) {
      //return item with req.params.resource_type and req.params.resource_id
      res.json({ status: true, body: 'Return JSON object instead of this string' });
    })
    .post(function(req, res) {
      //add item to DB with req.params.resource_type and req.params.resource_id
    })
    .delete(function(req, res) {
      //Delete item from DB req.params.resource_type and req.params.resource_id
    })

}
