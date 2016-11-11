module.exports = function (app, router) {

  // /users/:user_type/:user_id'  // not sure we need this

  router.route('/users/:user_type/:user_id')
    .get(function(req, res) {
      //return user with req.params.user_type and req.params.user_id *** not sure if needed
      res.json({ status: true, body: 'Return JSON object instead of this string' });
    })
    .post(function(req, res) {
      //add user to DB with req.params.user_type and req.params.user_id
    })
    .delete(function(req, res) {
      //Delete user from DB with req.params.user_type and req.params.user_id
    })


}
