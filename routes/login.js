module.exports = function (app, router, db, models) {

  router.route('/login')
	.post(function(req, res){ 
		
		// clean input ?
			// for example: check for no spaces (simplified version)
		try {
        models.sequelize.sync().then(() => {
          db.userLogin(req.params.user_id, req.params.user_password)) // get user/pass retreival method from db  ***********
		    .then(
				responseObject => {
			// Convert responseObject to boolean
			// If successful (User exists, and password matches)
				
					// create json web token
					var userToken = jwt.sign(user, app.get('superSecret'), {
						expiresInMinutes: 1440 // expires in 24 hours
					});
					// add token to response ? (or redirect)
					res.json({ 
						status: true,
						body: {message: "Successful Login!"},
						token: userToken // do we need this?
					});
					
					// redirect to page corresponding to user type	
						// example:
					res.redirect('/resources');
					
					// redirect the user to the appropriate page (depending on type of user)
			// If failure (User exists, password does not match OR User does not exist)
					// add error to response
					// redirect to login page
					res.redirect('/');
				}
            )
          });
		} catch (e) {
        console.log(e);
        res.json({status: false, body: {error: "message"}})
      }
	
	});
	///////////////////
	
  router.route('/test')
    .get(function(req, res) {
      try {
        models.sequelize.sync(/*{force:true}*/).then(() => {
          db.getRoomItems(1)
            .then(aa => res.json({ status: true, body: aa }))
        });
      } catch (e) {
        console.log(e);
        res.json({ status: false, body: {error: "message"} });
      }

    });

}
