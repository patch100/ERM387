INSERT INTO Reservation (userId, resourceId, startTime, endTime, createdAt, updatedAt)
SELECT
  (SELECT userId FROM User WHERE email like 'joeblo@gmail.com' LIMIT 1),
  resourceId,
  (SELECT datetime('now')),
  (SELECT datetime('now', '+1 day')),
  (SELECT datetime('now')),
  (SELECT datetime('now'))
FROM Resource WHERE Resource.resourceType = 'Room' ORDER BY resourceId ASC LIMIT 1;

INSERT INTO ReservationResource (reservationId, resourceId, createdAt, updatedAt)
SELECT reservationId, (SELECT resourceId FROM Resource WHERE resourceType = 'Computer' ORDER BY resourceId ASC LIMIT 1), (SELECT datetime('now')), (SELECT datetime('now'))
FROM Reservation ORDER BY reservationId ASC LIMIT 1;
