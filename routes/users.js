module.exports = function(app, router, db) {

    // /users/:user_type/:user_id'  // not sure we need this

    router.route('/users')
        .get(function(req, res) {
            //return all users
            var filters = req.query;

            //TODO prefix email?

            db.getUsers( /*filters*/ )
                .then(users => res.json({
                    status: true,
                    body: users
                }))

        })
        .post(function(req, res) {
            // TODO: create a new user
            // Check if user creation is from an unregistered user or an admin
            // Assume Admin creation initially, implement registration later

        })


    router.route('/users/:user_id')
        .get(function(req, res) {
            //return user with req.params.user_type and req.params.user_id *** not sure if needed

            var filters = req.query;
            //TODO prefix email?

            db.getUserById( /*filters, */ req.params.user_id)
                .then(user => res.json({
                    status: true,
                    body: user
                }))

        })
        .post(function(req, res) {
            //TODO this is for modification
            //ID is autoincrement here. Therefore, not the right route
            // TODO Refactor, the type is taken from the body
            db.addUser(req.params.user_type, req.body.user).then(result => {
                /*TODO HERE Check if return is true or false*/
                res.json({
                    status: true,
                    body: "some message"
                });
            });
            //add user to DB with req.params.user_type and req.params.user_id
            // Might not implement this from the perspective of a users route.. Maybe /signup or /register route
            // or do both (IT employee/manager wants to create a user without going through signup/register...?)
        })
        .delete(function(req, res) {
            db.removeUser(req.params.user_id).then(result => {
                /*HERE Check if return is true or false*/
                res.json({
                    status: true,
                    body: "some message"
                });
            });
            //Delete user from DB with req.params.user_type and req.params.user_id
        })


}
