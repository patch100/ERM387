module.exports = function(app, router, db) {

    // /inventory/:resource_type/:resource_id' // resource_id is optional (changes the behaviour of HTTP verbs)

    router.route('/inventory')
        .get(function(req, res) {
            //return all inventory items
            var filters = req.query;
            if (filters.date_start || filters.date_end) {
                filters.date_start = {
                    $gt: filters.date_start
                };
                filters.date_end = {
                    $lt: filters.date_end
                };
            }

            db.getResources( /*filters*/ )
                .then(resources => {
                    if (resources) {
                        res.json({ status: true, body: resources })
                    } else {
                        res.json({ status: true, body: { error: "No match found." } })
                    }
                })
          })
    .post(function(req, res) {
        try {
            db.addResource(req.body.resource).then(
                resp => {
                    res.json({ status: true, body: { error: "Successfully created a new Resource." } })
                })
        } catch (e) {
            res.json({ status: false, body: { error: "Failed to create the Resource." } })
        }
    });


    router.route('/inventory/:resource_type')
        .get(function(req, res) {
            //return items with req.params.resource_type
            var filters = req.query;
            if (filters.date_start || filters.date_end) {
                filters.date_start = {
                    $gt: filters.date_start
                };
                filters.date_end = {
                    $lt: filters.date_end
                };
            }

            try {
            db.getResourcesByType( /* filters, */ req.params.resource_type)
                .then(resources =>
                  {
                if (resources) {
                  res.json({ status: true, body: resources })
                } else {
                  res.json({ status: false, body: {error: "No match found."}})
                }
              }
            );
              } catch (e) {
                res.json({status: false, body: {error: "Failed to fetch resources."}})
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
