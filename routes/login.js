module.exports = function (app, router) {

  router.route('/login')
    .get(function(req, res) {
      if(true){
        //place redirect page here
        // res.redirect("/admin");
        res.json({status: true, body: 'Logged in' });
      }
      else{
        res.json({status: false, body: 'Invalid login' });
      }

    });


}
