module.exports = function(app, router, db, models) {

    // /inventory/:resource_type/:resource_id' // resource_id is optional (changes the behaviour of HTTP verbs)

    router.route('/inventory')
        .get(function(req, res) {
            //return all inventory items
            db.getResources().then(
                resources => {
                    if (resources) {
                        res.json({ status: true, body: resources })
                    } else {
                        res.json({ status: true, body: { error: "No match found." } })
                    }
                }
            );
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
            try {
            db.getResourcesByType(req.params.resource_type).then(
              resources => {
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
            db.getResourceById(req.params.resource_id)
                .then(resource => res.json({ status: true, body: resource }))
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

}
