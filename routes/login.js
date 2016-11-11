module.exports = function (app, router, db, models) {

  router.route('/login')
    .get(function(req, res) {
      if(true){
        //place redirect page here
        // res.redirect("/admin");
        res.json({status: true, body: {message: "Successful Login!"} });
      }
      else{
        res.json({status: false, body: {error: "Failed Login.."} });
      }

    });

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
