#UserType
INSERT INTO UserType (typeName)
VALUES ('End-User'),('IT');

#User
INSERT INTO User (typeId, firstName, lastName, phoneNumber, email, isAdmin, passwordHash, createdAt, updatedAt)

SELECT typeId, 'ABC', 'DEF', '3334445555', 'abc@def.com', 0, '123', NOW(), NOW()
FROM UserType WHERE typeName = 'IT';

INSERT INTO User (typeId, firstName, lastName, phoneNumber, email, isAdmin, passwordHash, createdAt, updatedAt)
SELECT typeId, 'GHI', 'JKL', '3334445555', 'ghi@jkl.com', 0, '123', NOW(), NOW()
FROM UserType WHERE typeName = 'End-User';

INSERT INTO User (typeId, firstName, lastName, phoneNumber, email, isAdmin, passwordHash, createdAt, updatedAt)
SELECT typeId, 'MNO', 'PQR', '3334445555', 'mno@pqr.com', 1, '123', NOW(), NOW()

FROM UserType WHERE typeName = 'End-User';

#Resource
INSERT INTO Resource (resourceType, isIt, createdAt, updatedAt)
VALUES ('Computer', 1, NOW(), NOW()),
        ('Computer', 1, NOW(), NOW()),
        ('Projector', 1, NOW(), NOW()),
        ('Projector', 1, NOW(), NOW()),
        ('WhiteBoard', 1, NOW(), NOW()),
        ('WhiteBoard', 1, NOW(), NOW()),
        ('Room', 0, NOW(), NOW()),
        ('Room', 0, NOW(), NOW());

#Computer
INSERT INTO Computer (resourceId, RAM, storage, operatingSystem, createdAt, updatedAt)
SELECT resourceId, '3.7', '200', 'Windows10', NOW(), NOW()
FROM Resource WHERE Resource.resourceType = 'Computer';

#Projector
INSERT INTO Projector (resourceId, createdAt, updatedAt)
SELECT resourceId, NOW(), NOW()
FROM Resource WHERE Resource.resourceType = 'Projector';

#WhiteBoard
INSERT INTO WhiteBoard (resourceId, isPrintable, createdAt, updatedAt)
SELECT resourceId, 1, NOW(), NOW()
FROM Resource WHERE Resource.resourceType = 'WhiteBoard';

#Room
INSERT INTO Room (roomType, resourceId, height, width, length, capacity, roomNumber)
SELECT "conference", resourceId, 8, 20, 20, 40, 'H555'
FROM Resource WHERE resourceType = 'Room' ORDER BY resourceId DESC LIMIT 1;

INSERT INTO Room (roomType, resourceId, height, width, length, capacity, roomNumber)
SELECT "meeting", resourceId, 8, 40, 40, 120, 'H890'
FROM Resource WHERE resourceType = 'Room' ORDER BY resourceId ASC LIMIT 1;
 
#Reservations
INSERT INTO Reservation (userId, resourceId, startTime, endTime, createdAt, updatedAt)
SELECT
  (SELECT userId FROM User WHERE firstName = 'ABC' LIMIT 1), resourceId, NOW(), NOW() + INTERVAL 1 DAY, NOW(), NOW()
FROM Resource WHERE Resource.resourceType = 'Room' ORDER BY resourceId ASC LIMIT 1;

#ReservationResources
INSERT INTO ReservationResource (reservationId, resourceId, createdAt, updatedAt)
SELECT reservationId, (SELECT resourceId FROM Resource WHERE resourceType = 'Computer' ORDER BY resourceId ASC LIMIT 1), NOW(), NOW()
FROM Reservation ORDER BY reservationId ASC LIMIT 1;