module.exports = function(app, router, db, models) {

    router.route('/login')
        .post(function(req, res) {

            // clean input ?
            // for example: check for no spaces (simplified version)
            try {
                db.userLogin(req.body.user_id, req.body.user_password)
                    .then(
                        responseObject => {
                            if (responseObject.status) { // If successful (User exists, and password matches)
                                // create json web token
                                var userToken = jwt.sign(user, app.get('superSecret'), {
                                    expiresInMinutes: 1440 // expires in 24 hours
                                });

                                res.cookie('token', userToken)

                                res.json({
                                    status: true,
                                    body: {
                                        message: "Successful Login!",
                                        isAdmin: responseObject.is_admin
                                    } // ***************************************
                                });

                            } else { // Username & password are invalid
                                res.json({
                                    status: false,
                                    body: { error: "Failure to Authenticate" }
                                });
                            }
                        } // end of responseObject
                    );
            } catch (e) {
                console.log(e);
                res.json({ status: false, body: { error: "Request Failure" } }) // all fails
            }

        });
    ///////////////////

    router.route('/test')
        .get(function(req, res) {
            try {
                models.sequelize.sync( /*{force:true}*/ ).then(() => {
                    db.getRoomItems(1)
                        .then(aa => res.json({ status: true, body: aa }))
                });
            } catch (e) {
                console.log(e);
                res.json({ status: false, body: { error: "message" } });
            }

        });

}
