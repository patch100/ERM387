module.exports = function(app, router, db) {

    // /users/:user_type/:user_id'  // not sure we need this

    router.route('/users')
        .get(function(req, res) {
            //return all users
            var filters = req.query;

            //TODO check for room_id in reservations

            db.getUsers( /*filters*/ )
                .then(users => {

                    if (users.status) {
                        var result = {};

                        console.log(users);
                        result["status"] = true;
                        result["body"] = {
                            "users": []
                        }
                        for (var user of users.body) {
                            //massage variables to match doc
                            if (user.phone_number) {
                                user["phone"] = user.phone_number;
                                delete user.phone_number;
                            }
                            if (user.reservations) {
                                for (var resource of user.reservations) {
                                    if (resource.start_time) {
                                        resource["date_start"] = Date.parse(resource.start_time);
                                        delete resource.start_time;
                                    }
                                    if (resource.end_time) {
                                        resource["date_end"] = Date.parse(resource.end_time);
                                        delete resource.end_time;
                                    }
                                }
                            }
                            result.body.users.push(user);
                        }
                        res.json(result)
                    } else {
                        res.json({
                            status: false,
                            body: {
                                error: "No match found."
                            }
                        })
                    }
                })
        })
        .post(function(req, res) {
            // TODO: Create a new user
            // Check if user creation is from an unregistered user or an admin
            // Assume Admin creation initially, implement registration later

            var newUser = req.body.user;
            var user_type = req.body.user.type;
            var email = req.body.user.email;
            var validator = require('validator');
            newUser["password"] = "root";
            if (!validator.isEmail(email)) {
                res.json({
                    status: false,
                    body: {
                        "message": "The email provided is an invalid format."
                    }
                });
            } else {
                db.addUser(user_type, newUser).then(result => {
                    res.json({
                        status: true,
                        body: {
                            "message": "Successfully created user!"
                        }
                    });
                });
            }
        });


    router.route('/users/:user_id')
        .get(function(req, res) {
            //return user with req.params.user_type and req.params.user_id *** not sure if needed

            var filters = req.query;

            //TODO check for room_id in reservations

            db.getUserById( /*filters, */ req.params.user_id)
                .then(user => {

                    //massage variables to match doc
                    if (user.status) {
                        if (user.body.phone_number) {
                            user.body["phone"] = user.body.phone_number;
                            delete user.body.phone_number;
                        }
                        if (user.body.reservations) {
                            for (var resource of user.body.reservations) {
                                if (resource.start_time) {
                                    resource["date_start"] = Date.parse(resource.start_time);
                                    delete resource.start_time;
                                }
                                if (resource.end_time) {
                                    resource["date_end"] = Date.parse(resource.end_time);
                                    delete resource.end_time;
                                }
                            }
                        }
                        res.json(user)
                    } else {
                        res.json({
                            status: false,
                            body: {
                                error: "No match found."
                            }
                        })
                    }
                })

        })
        .post(function(req, res) {

            db.updateUser(req.params.user_id, req.body.user).then(result => {
                /*TODO HERE Check if return is true or false*/
                if (result) {
                    res.json({
                        status: true,
                        body: {
                            "message": "User was successfully modified!"
                        }
                    });
                } else {
                    res.json({
                        status: false,
                        body: {
                            "message": "Were sorry the user could not be modified"
                        }
                    });
                }
            })
        })
        //Delete user from DB with req.params.user_type and req.params.user_id
        /*Assuming that only admins can delete users for now*/
        .delete(function(req, res) {
            db.removeUser(req.params.user_id).then(result => {
                /** should be checked if admin before removing from db ? As this would give error
                    if (user_type == "admin") {
                        res.json({ status: true, body: "User successfully deleted." });
                    } else {
                        res.json({ status: false, body: "Unable to delete user." });
                    }
                */
                if (result) {
                    res.json({
                        status: true,
                        body: {
                            "message": "User was successfully deleted!"
                        }
                    });
                } else {
                    res.json({
                        status: false,
                        body: {
                            "message": "Were sorry the user could not be deleted"
                        }
                    });
                }

            });

        })


}
