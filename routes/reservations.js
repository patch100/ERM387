module.exports = function(app, router, db) {

    router.route('/reservations')
        .get(function(req, res) {
            //return all users
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
                db.getReservations( /*filters*/ )
                    .then(reservations => {

                        if (reservations == null) {
                            res.json({
                                status: true,
                                body: {
                                    error: "No reservations found"
                                }
                            })
                        } else {
                            res.json({
                                status: true,
                                body: reservations
                            })
                        }

                    })
            } catch (e) {
                res.json({
                    status: false,
                    body: {
                        error: "No reservations found"
                    }
                })
            }


        })

    router.route('/reservations/:reservation_id')
        .get(function(req, res) {
            //return all users

            try {
                db.getReservationById(req.params.reservation_id)
                    .then(reservation => {

                        if (reservation == null) {
                            res.json({
                                status: true,
                                body: {
                                    error: "No reservation found"
                                }
                            })
                        } else {
                            res.json({
                                status: true,
                                body: reservation
                            })
                        }

                    })
            } catch (e) {
                res.json({
                    status: false,
                    body: {
                        error: "No reservation found"
                    }
                })
            }


        })

}
