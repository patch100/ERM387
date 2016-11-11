module.exports = function (app, router, db, models) {

  // /rooms/:room_type/:room_id' room_id is optional (changes behaviour of HTTP verbs)

  router.route('/rooms')
    .get(function(req, res) {
      //return all rooms

    });

  router.route('/rooms/:room_type')
    .get(function(req, res) {
      //return room with req.params.room_type
      try {
        models.sequelize.sync(/*{force:true}*/).then(() => {
          db.getRoomsByType(req.params.room_type)
            .then(aa => res.json({ status: true, body: aa }))
        });
      } catch (e) {
        console.log(e);
        res.json({ status: false, body: "error" });
      }
    })



  router.route('/rooms/:room_type/:room_id')
    .get(function(req, res) {
      //return room with req.params.room_type and req.params.room_id

      try {
        models.sequelize.sync(/*{force:true}*/).then(() => {
          db.getRoomByTypeAndId(req.params.room_type, req.params.room_id)
            .then(aa => res.json({ status: true, body: aa }))
        });
      } catch (e) {
        console.log(e);
        res.json({ status: false, body: "error" });
      }

    })
    .post(function(req, res) {
      //add item to DB with req.params.room_type and req.params.room_id
    })
    .delete(function(req, res) {
      //Delete item from DB with req.params.room_type and req.params.room_id
    });

  router.route('/rooms/:room_type/:room_id/items')
    .get(function(req, res) {
      //return room with req.params.room_type and req.params.room_id
      try {
        models.sequelize.sync(/*{force:true}*/).then(() => {
          db.getRoomItems(req.params.room_id)
            .then(aa => res.json({ status: true, body: aa }))
        });
      } catch (e) {
        console.log(e);
        res.json({ status: false, body: "error" });
      }

    })












}
