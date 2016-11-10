module.exports = function (app, router) {

  router.route('/login')
    .get(function(req, res) {
            res.json({ message: 'At login created!' });
    });


}
