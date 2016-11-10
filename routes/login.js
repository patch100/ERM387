module.exports = function (app, router) {

  router.route('/login')
    .get(function(req, res) {
      if(true){
        //place redirect page here
        // res.redirect("/admin");
        res.json({ message: 'Logged in' });
      }
      else{
        res.json({ message: 'Invalid login' });
      }

    });


}
