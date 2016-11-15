module.exports = function (app, router, db, models) {

  // /users/:user_type/:user_id'  // not sure we need this

  router.route('/users')
    .get(function(req, res) {
      //return all users
      db.getUsers()
        .then(users => res.json({ status: true, body: users }))
  //     try {
  //       models.sequelize.sync(/*{force:true}*/).then(() => {
  // // DOC: what does aa stand for? Is it a string or an Object? (json {})
  //       });
  //     } catch (e) {
  //       console.log(e);
  //       res.json({ status: false, body: {error: "message"}});
  //     }
    })


  router.route('/users/:user_type/:user_id')
    .get(function(req, res) {
      //return user with req.params.user_type and req.params.user_id *** not sure if needed
      db.getUserById(req.params.user_id)
        .then(user => res.json({ status: true, body: user }))
      // try {
      //   models.sequelize.sync(/*{force:true}*/).then(() => {
      //
      //   });
      // } catch (e) {
      //   console.log(e);
      //   res.json({ status: false, body: {error: "message"}});
      // }
    })
    .post(function(req, res) {
      //add user to DB with req.params.user_type and req.params.user_id
      // Might not implement this from the perspective of a users route.. Maybe /signup or /register route
      // or do both (IT employee/manager wants to create a user without going through signup/register...?)
    })
    .delete(function(req, res) {
      //Delete user from DB with req.params.user_type and req.params.user_id
    })


}
