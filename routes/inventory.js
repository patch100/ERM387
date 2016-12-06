module.exports = function(app, router, db) {

    var resource_types = ['Computer', 'Projector', 'Room', 'WhiteBoard'];

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
                    result = { "body": { "resources": [] } }
                    if (resources.status && resources.body) {
                        result.status = true;
                        for (var resource of resources.body) {
                            for (var reservation of resource.reservations) {
                                reservation.date_start = Date.parse(reservation.start_time);
                                reservation.date_end = Date.parse(reservation.end_time);
                                delete reservation.start_time;
                                delete reservation.end_time;
                            }
                            resource.it_resource = resource.is_it;
                            delete resource.is_it;
                            result.body.resources.push(resource);
                        }
                        res.json(result);
                    } else {
                        res.json({ status: false, body: { error: "No match found." } });
                    }
                })
        }).post(function(req, res) {
            if (resource_types.indexOf(req.body.resource.type) === -1) {
                return res.json({ status: false, body: { message: "Wrong Resource Type." } });
            }
            creation = req.body.resource;
            creation.is_it = creation.it_resource;
            delete creation.it_resource;
            if (creation.type === "WhiteBoard") {
                creation.isPrintable = creation.printable;
                delete creation.printable;
            }

            db.addResource(creation).then(
                resp => {
                    if (resp.status) {
                        res.json({ status: true, body: { message: "Successfully created a new Resource." } });
                    } else {
                        res.json({ status: false, body: { message: "Failed to create the Resource." } });
                    }
                });
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
            if (resource_types.indexOf(req.params.type) > -1) {
                db.getResourcesByType( /* filters, */ req.params.type)
                    .then(resources => {
                        if (resources.status && resources.body) {
                            result = { status: true, body: { resources: [] } }
                            for (var resource of resources.body) {
                                resource.it_resource = resource.is_it;
                                delete resource.is_it;
                                for (reservation of resource.reservations) {
                                    reservation.date_start = Date.parse(reservation.start_time);
                                    reservation.date_end = Date.parse(reservation.end_time);
                                    delete reservation.start_time;
                                    delete reservation.end_time;
                                }
                                result.body.resources.push(resource);
                            }
                            res.json(result)
                        } else {
                            res.json({ status: false, body: { error: "Failed to retrieve resources." } })
                        }
                    });
            } else {
                res.json({ status: false, body: { error: "Invalid Resource Type" } });
            }
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
