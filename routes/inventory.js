module.exports = function(app, router, db) {

    router.route('/inventory')
        .get(function(req, res) {
            //return all inventory items

            // TODO Filtering
            /*var filters = req.query;
            if (filters.date_start || filters.date_end) {
                filters.date_start = {
                    $gt: filters.date_start
                };
                filters.date_end = {
                    $lt: filters.date_end
                };
            }*/

            db.getResources( /*filters*/ )
                .then(resources => {
                    result = {}
                    return res.json({ status: true, body: { resources: resources } })
                    if (resources.status) {
                        result.status = true
                        for (var resource of resources.body.resources) {
                            for (var reservation of resource.reservation) {
                                reservation.date_start = Date.parse(reservation.start_time);
                                reservation.date_end = Date.parse(reservation.end_time);
                                delete reservation.start_time;
                                delete reservation.end_time;
                            }
                            resource.it_resource = resource.is_it;
                            delete resource.is_it;
                            resource.reservations = resource.reservation;
                            delete resource.reservation;
                            result.body.resources.push(resource);
                        }
                        res.json(result);
                    } else {
                        res.json({ status: false, body: { error: "No match found." } })
                    }
                })
        })
        .post(function(req, res) {
            try {
                db.addResource(req.body.resource).then(
                    resp => {
                        res.json({ status: true, body: { message: "Successfully created a new Resource." } })
                    })
            } catch (e) {
                res.json({ status: false, body: { error: "Failed to create the Resource." } })
            }
        });


    router.route('/inventory/:type')
        .get(function(req, res) {
            //return items with req.params.resource_type
            /* var filters = req.query;
            if (filters.date_start || filters.date_end) {
                filters.date_start = {
                    $gt: filters.date_start
                };
                filters.date_end = {
                    $lt: filters.date_end
                };
            } */
            db.getResourcesByType( /* filters, */ req.params.type)
                .then(resources => {
                    if (resources.status) {
                        result = {
                            status: true,
                            body: {
                                resources: []
                            }
                        }
                        for (var resource of resources.body.resource) {
                            resource.it_resouce = resource.is_it;
                            delete resource.is_it;
                            resource.reservations = resource.reservation;
                            delete resource.reservation;

                            for (reservation of resource.reservations) {
                                reservation.date_start = Date.parse(reservation.start_time);
                                reservation.date_end = Date.parse(reservation.end_time);
                                delete reservation.start_time;
                                delete reservation.end_time;
                            }
                            result.body.resources.push(resource);
                        }
                    } else {
                        res.json({ status: false, body: { error: "Failed to retrieve resources." } })
                    }
                });
        });


    router.route('/inventory/:resource_type/:resource_id')
        .get(function(req, res) {
            //return item with req.params.resource_type and req.params.resource_id
            var filters = req.query;
            if (filters.date_start || filters.date_end) {
                filters.date_start = {
                    $gt: filters.date_start
                };
                filters.date_end = {
                    $lt: filters.date_end
                };
            }

            db.getResourceById( /* filters, */ req.params.resource_id)
                .then(resource => res.json({
                    status: true,
                    body: resource
                }))
        })
        .post(function(req, res) {
            // checks if the resource has an ID.
            //if(db.getResourceById(req.params.resource_id) == req.body.resource_id){
            db.updateResource(req.params.resource_id, req.body.resource).then(resp => {
                if (resp) {
                    res.json({ status: true, body: "Successfully modified the Resource." });
                } else {
                    res.json({ status: false, body: "There was an error in modifying the Resource." });
                }
            })
        })

    .delete(function(req, res) {
        db.removeResource(req.params.resource_id)
            .then(resp => res.json({ status: true, body: "Successfully deleted the Resouce." }));
        //Delete item from DB req.params.resource_type and req.params.resource_id
    });

    router.route('/inventory/reserve')
        .post(function(req, res) {
            //return all inventory items
            db.addResourceReservation(req.body, null)
                .then(resp => res.json({
                    status: true,
                    body: resp
                }));
        });

    router.route('/inventory/cancel')
        .post(function(req, res) {
            //return all inventory items

            db.cancelReservation(req.body)
                .then(resp => res.json({
                    status: true,
                    body: resp
                }));
        });
}
