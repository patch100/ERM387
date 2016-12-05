module.exports = function(app, router, db) {

  // /rooms/:room_type/:room_id' room_id is optional (changes behaviour of HTTP verbs)

  router.route('/rooms')
    .get(function(req, res) {

            var filters = req.query;
            if (filters.date_start || filters.date_end) {
                filters.date_start = {
                    $gt: filters.date_start
                };
                filters.date_end = {
                    $lt: filters.date_end
                };
            }

            // db.getRooms(filters).then(rooms => res.json({status: true, body: rooms}));
            db.getRooms( /* filters, */ )
                .then(rooms => res.json({
                    status: true,
                    body: rooms
                }));
    })
    .post(function(req, res) {
      //add item to DB with req.params.room_type and req.params.room_id
      // check the body for all the parameter. Needs to be sanitized.
      // check for Resources in the room.
      db.addResource(req.body.room)
        .then(resp => res.json({status: true, body: "Room created"}))
    });

  router.route('/rooms/:room_type')
    .get(function(req, res) {
      //return room with req.params.room_type

            var filters = req.query;
            if (filters.date_start || filters.date_end) {
                filters.date_start = {
                    $gt: filters.date_start
                };
                filters.date_end = {
                    $lt: filters.date_end
                };
            }

            db.getRoomsByType( /* filters, */ req.params.room_type)
                .then(aa => res.json({
                    status: true,
                    body: aa
                }))
    });

    router.route('/rooms/items/:room_id') // REFACTOR: we want consistency, :room_id should come after items
      .get(function(req, res) {
        //return room with req.params.room_type and req.params.room_id
        db.getRoomItems(req.params.room_id)
                .then(items => res.json({
                    status: true,
                    body: items
                }));
        })



    router.route('/rooms/:room_type/:room_id')
    .get(function(req, res) {
      //return room with req.params.room_type and req.params.room_id
      // REFACTOR: technically an ID should be unique, the room type should not be needed to retrieve by id

            var filters = req.query;
            if (filters.date_start || filters.date_end) {
                filters.date_start = {
                    $gt: filters.date_start
                };
                filters.date_end = {
                    $lt: filters.date_end
                };
      }
            db.getRoomById( /* filters, */ req.params.room_id)
                .then(room => res.json({
                    status: true,
                    body: room
                }));
        })
    .post(function(req,res){
      db.updateResource(req.params.room_id,req.body.room).then(result => {
      if(result){

        res.json({ status: true, body: "Successfully modified Room." });
      }
      else{
        res.json({ status: false, body: "There was an error in modifiying Room." });
      }})
    })
    .delete(function(req, res) {
      //Delete item from DB with req.params.room_type and req.params.room_id
            db.removeRoom(req.params.room_id)
                .then(resp => res.json({
                    status: true,
                    body: resp
                }))
    });


  router.route('/rooms/:room_id/:resource_type/:resource_id')
    .post(function(req, res) {
      // post only used to modify resources in a room, not to create new resources
      // we don't need this path, the POST body will contain resource mods
      // the path: '/rooms/items/:resource_id'
      db.addRoomItem(req.params.room_id, req.params.resource_id)
                .then(resp => res.json({
                    status: true,
                    body: resp
                }))
    })
    .delete(function(req, res) {
      // delete an item from a room, does not delete the item.
      // path '/rooms/items/:room_id' and resource id in POST body. (something like that)
      db.removeRoomItem(req.params.resource_id, req.params.room_id)
                .then(resp => res.json({
                    status: true,
                    body: resp
                }))
    });


    router.route('/rooms/reserve')
        .post(function(req, res) {

            db.addReservation(req.body)
                .then(rooms => res.json({
                    status: true,
                    body: rooms
                }));

            if (req.body.equipments) {
                for (var resource in req.body.equipments) {
                    var resourceBody = {
                        "resource_id": resource.resource_id,
                        "date_start": req.body.date_start,
                        "date_end": req.body.date_end,
                        "room_id": req.body.room_id,
                        "user_id": req.body.user_id
                    }
                    db.addResourceReservation(resourceBody, null) // not sure about second param
                        .then(resp => res.json({
                            status: true,
                            body: resp
                        }));
                }
            }

        });

    router.route('/rooms/cancel')
        .post(function(req, res) {
            db.cancelReservation(req.body.reservation_id)
                .then(resp => res.json({
                    status: true,
                    body: resp
                }));
        });

}
