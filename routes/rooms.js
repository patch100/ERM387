module.exports = function (app, router, db, models) {

  // /rooms/:room_type/:room_id' room_id is optional (changes behaviour of HTTP verbs)

  router.route('/rooms')
    .get(function(req, res) {
      //return all rooms
      try {
        models.sequelize.sync(/*{orce:true}*/).then(() => {
          db.getRooms().then(aa => res.json({status: true, body: aa}))
        });
      } catch (e) {
        console.log(e);
        res.json({ status: false, body: {error: "message"} });
      }
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
        res.json({ status: false, body: {error: "message"} });
      }
    })



  router.route('/rooms/:room_type/:room_id')
    .get(function(req, res) {
      //return room with req.params.room_type and req.params.room_id
      // REFACTOR: technically an ID should be unique, the room type should not be needed to retrieve by id
      try {
        models.sequelize.sync(/*{force:true}*/).then(() => {
          db.getRoomByTypeAndId(req.params.room_type, req.params.room_id)
            .then(aa => res.json({ status: true, body: aa }))
        });
      } catch (e) {
        console.log(e);
        res.json({ status: false, body: {error: "message"} });
      }
    })
    .post(function(req, res) {
      //add item to DB with req.params.room_type and req.params.room_id
      // check the body for all the parameter. Needs to be sanitized.
      // check for Resources in the room.
    })
    .delete(function(req, res) {
      //Delete item from DB with req.params.room_type and req.params.room_id
    });

  router.route('/rooms/:room_id/items')  // REFACTOR: we want consistency, :room_id should come after items
    .get(function(req, res) {
      //return room with req.params.room_type and req.params.room_id
      try {
        models.sequelize.sync(/*{force:true}*/).then(() => {
          db.getRoomItems(req.params.room_id)
            .then(aa => res.json({ status: true, body: aa }))
        });
      } catch (e) {
        console.log(e);
        res.json({ status: false, body: {error: "message"} });
      }

    })

  router.route('/rooms/:room_id/:resource_type/:resource_id')
    .post(function(req, res) {
      // post only used to modify resources in a room, not to create new resources
      // we don't need this path, the POST body will contain resource mods
      // the path: '/rooms/items/:resource_id'
    })
    .delete(function(req, res) {
      // delete an item from a room, does not delete the item.
      // path '/rooms/items/:room_id' and resource id in POST body. (something like that)
    })












}
