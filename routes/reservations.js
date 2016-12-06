module.exports = function(app, router, db) {

    router.route('/reservations')
        .get(function(req, res) {
            /*
            var filters = req.query;
            if (filters.date_start || filters.date_end) {
                filters.date_start = {
                    $gt: filters.date_start
                };
                filters.date_end = {
                    $lt: filters.date_end
                };
            }
            */

            db.getReservations( /*filters*/ )
                .then(reservations => {
                    if (reservations.status) {
                        if (reservations.body) {
                            result = { reservations: [] }
                            for (r of reservations.body) {
                                r.date_start = Date.parse(r.start_time);
                                r.date_end = Date.parse(r.end_time);
                                delete r.start_time;
                                delete r.end_time;
                                result.reservations.push(r);
                            }
                            res.json({ status: true, body: result });
                        } else {
                            res.json({ status: true, body: { reservations: [], message: "No reservations found" } });
                        }
                    } else {
                        res.json({ status: false, body: { error: "Retrieving reservations failed." } });
                    }
                })
        })

    router.route('/reservations/:reservation_id')
        .get(function(req, res) {

            db.getReservationById(req.params.reservation_id)
                .then(reservation => {
                    if (reservation.status) {
                        if (reservation.body) {
                            result = { reservation: {}}
                            reservation.body.start_date = Date.parse(reservation.body.start_time);
                            reservation.body.end_date = Date.parse(reservation.body.end_time);
                            delete reservation.body.start_time;
                            delete reservation.body.end_time;
                            result.reservation = reservation.body;
                            res.json({status: true, body: result});
                        } else {
                            res.json({ status: true, body: { reservation: {}, message: "No reservation found." } });
                        }
                    } else {
                        res.json({ status: false, body: { error: "Failed to Retrieve specific reservation." } });
                    }
                });
        });

}
