module.exports = function (app, router, db, models) {

  // /users/:user_type/:user_id'  // not sure we need this

  router.route('/users')
    .get(function(req, res) {
      //return all users
      try {
        models.sequelize.sync(/*{force:true}*/).then(() => {
          db.getUsers()
            .then(aa => res.json({ status: true, body: aa }))
        });
      } catch (e) {
        console.log(e);
        res.json({ status: false, body: "error" });
      }
    })


  router.route('/users/:user_type/:user_id')
    .get(function(req, res) {
      //return user with req.params.user_type and req.params.user_id *** not sure if needed

      try {
        models.sequelize.sync(/*{force:true}*/).then(() => {
          db.getUserByTypeAndId(req.params.user_type, req.params.user_id)
            .then(aa => res.json({ status: true, body: aa }))
        });
      } catch (e) {
        console.log(e);
        res.json({ status: false, body: "error" });
      }
    })
    .post(function(req, res) {
      //add user to DB with req.params.user_type and req.params.user_id
    })
    .delete(function(req, res) {
      //Delete user from DB with req.params.user_type and req.params.user_id
    })


}
