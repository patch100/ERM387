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
                .then(resources => res.json({
                    status: true,
                    body: resources
                }));
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

            db.getResourcesByType( /* filters, */ req.params.resource_type)
                .then(resources => res.json({
                    status: true,
                    body: resources
                }));

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
            db.addResource(req.body.resource)
                .then(resp => res.json({
                    status: true,
                    body: resp
                }));
            //add item to DB with req.params.resource_type and req.params.resource_id
        })
        .delete(function(req, res) {
            db.removeResource(req.params.resource_id)
                .then(resp => res.json({
                    status: true,
                    body: resp
                }));
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
