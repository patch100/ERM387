INSERT INTO UserType (typeName)
VALUES ('End-User'),('IT');

INSERT INTO User (typeId, firstName, lastName, phoneNumber, email, isAdmin, passwordHash, createdAt, updatedAt)
SELECT typeId, 'ABC', 'DEF', '3334445555', 'abc@def.com', 0, '123', (SELECT datetime('now')), (SELECT datetime('now'))
FROM UserType WHERE typeName = 'IT';

INSERT INTO User (typeId, firstName, lastName, phoneNumber, email, isAdmin, passwordHash, createdAt, updatedAt)
SELECT typeId, 'GHI', 'JKL', '3334445555', 'ghi@jkl.com', 0, '123', (SELECT datetime('now')), (SELECT datetime('now'))
FROM UserType WHERE typeName = 'End-User';

INSERT INTO User
(typeId, firstName, lastName, phoneNumber, email, isAdmin, passwordHash, createdAt, updatedAt)
SELECT typeId, 'Joe', 'Blo', '15140001234', 'joeblo@gmail.com', 1, '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', (SELECT datetime('now')), (SELECT datetime('now'))
FROM UserType WHERE typeName = 'End-User';

INSERT INTO User (typeId, firstName, lastName, phoneNumber, email, isAdmin, passwordHash, createdAt, updatedAt)
SELECT typeId, 'MNO', 'PQR', '3334445555', 'mno@pqr.com', 1, '123', (SELECT datetime('now')), (SELECT datetime('now'))
FROM UserType WHERE typeName = 'End-User';

INSERT INTO Resource (resourceType, isIt, createdAt, updatedAt)
VALUES ('Computer', 1, (SELECT datetime('now')), (SELECT datetime('now'))),
        ('Computer', 1, (SELECT datetime('now')), (SELECT datetime('now'))),
        ('Projector', 1, (SELECT datetime('now')), (SELECT datetime('now'))),
        ('Projector', 1, (SELECT datetime('now')), (SELECT datetime('now'))),
        ('WhiteBoard', 1, (SELECT datetime('now')), (SELECT datetime('now'))),
        ('WhiteBoard', 1, (SELECT datetime('now')), (SELECT datetime('now'))),
        ('Room', 0, (SELECT datetime('now')), (SELECT datetime('now'))),
        ('Room', 0, (SELECT datetime('now')), (SELECT datetime('now')));

INSERT INTO Computer (resourceId, RAM, storage, operatingSystem, createdAt, updatedAt)
SELECT resourceId, '3.7', '200', 'Windows10', (SELECT datetime('now')), (SELECT datetime('now'))
FROM Resource WHERE Resource.resourceType = 'Computer';

INSERT INTO Projector (resourceId, createdAt, updatedAt)
SELECT resourceId, (SELECT datetime('now')), (SELECT datetime('now'))
FROM Resource WHERE Resource.resourceType = 'Projector';

INSERT INTO WhiteBoard (resourceId, isPrintable, createdAt, updatedAt)
SELECT resourceId, 1, (SELECT datetime('now')), (SELECT datetime('now'))
FROM Resource WHERE Resource.resourceType = 'WhiteBoard';

INSERT INTO Room (roomType, resourceId, height, width, length, capacity, roomNumber)
SELECT "conference", resourceId, 8, 20, 20, 40, 'H555'
FROM Resource WHERE resourceType = 'Room' ORDER BY resourceId DESC LIMIT 1;

INSERT INTO Room (roomType, resourceId, height, width, length, capacity, roomNumber)
SELECT "meeting", resourceId, 8, 40, 40, 120, 'H890'
FROM Resource WHERE resourceType = 'Room' ORDER BY resourceId ASC LIMIT 1;

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
