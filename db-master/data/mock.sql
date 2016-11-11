#UserType
INSERT INTO UserType (typeName)
VALUES ('End-User'),('IT');

#User
INSERT INTO User (typeId, firstName, lastName, phoneNumber, email, isAdmin, passwordHash, salt, createdAt, updatedAt)
SELECT typeId, 'ABC', 'DEF', '3334445555', 'abc@def.com', 0, '123', '123', NOW(), NOW()
FROM UserType WHERE typeName = 'IT';

INSERT INTO User (typeId, firstName, lastName, phoneNumber, email, isAdmin, passwordHash, salt, createdAt, updatedAt)
SELECT typeId, 'GHI', 'JKL', '3334445555', 'ghi@jkl.com', 0, '123', '123', NOW(), NOW()
FROM UserType WHERE typeName = 'End-User';

INSERT INTO User (typeId, firstName, lastName, phoneNumber, email, isAdmin, passwordHash, salt, createdAt, updatedAt)
SELECT typeId, 'MNO', 'PQR', '3334445555', 'mno@pqr.com', 1, '123', '123', NOW(), NOW()
FROM UserType WHERE typeName = 'End-User';

#Resource
INSERT INTO Resource (resourceType, isIt, available, createdAt, updatedAt)
VALUES ('Computer', 1, 1, NOW(), NOW()),
        ('Computer', 1, 0, NOW(), NOW()),
        ('Projector', 1, 1, NOW(), NOW()),
        ('Projector', 1, 0, NOW(), NOW()),
        ('WhiteBoard', 1, 1, NOW(), NOW()),
        ('WhiteBoard', 1, 0, NOW(), NOW()),
        ('Room', 0, 1, NOW(), NOW()),
        ('Room', 0, 0, NOW(), NOW());

#Equipment
INSERT INTO Equipment (resourceId)
SELECT resourceId FROM Resource WHERE resourceType <> 'Room';

#Computer
INSERT INTO Computer (equipmentId, RAM, storage, operatingSystem, createdAt, updatedAt)
SELECT equipmentId, '3.7', '200', 'Windows10', NOW(), NOW()
FROM Equipment INNER JOIN Resource ON Resource.resourceId = Equipment.resourceId
WHERE Resource.resourceType = 'Computer';

#Projector
INSERT INTO Projector (equipmentId, createdAt, updatedAt)
SELECT equipmentId, NOW(), NOW()
FROM Equipment INNER JOIN Resource ON Resource.resourceId = Equipment.resourceId
WHERE Resource.resourceType = 'Projector';

#WhiteBoard
INSERT INTO WhiteBoard (equipmentId, isPrintable, createdAt, updatedAt)
SELECT equipmentId, 1, NOW(), NOW()
FROM Equipment INNER JOIN Resource ON Resource.resourceId = Equipment.resourceId
WHERE Resource.resourceType = 'WhiteBoard';

#Room
INSERT INTO Room (roomType, resourceId, height, width, length, capacity, roomNumber)
SELECT "conference", resourceId, 8, 20, 20, 40, 'H555'
FROM Resource WHERE resourceType = 'Room' AND available = 0;

INSERT INTO Room (roomType, resourceId, height, width, length, capacity, roomNumber)
SELECT "meeting", resourceId, 8, 40, 40, 120, 'H890'
FROM Resource WHERE resourceType = 'Room' AND available = 1;

#RoomEquipment
INSERT INTO RoomEquipment (RoomId, equipmentId, createdAt, updatedAt)
SELECT
  (SELECT RoomId FROM Room WHERE roomNumber = 'H555' LIMIT 1),equipmentId, NOW(), NOW()
FROM Equipment INNER JOIN Resource ON Resource.resourceId = Equipment.resourceId
WHERE Resource.available = 0 AND Resource.resourceType <> 'Room';

#Reservations
INSERT INTO Reservation (userId, resourceId, startTime, endTime, createdAt, updatedAt)
SELECT
  (SELECT userId FROM User WHERE firstName = 'ABC' LIMIT 1), resourceId, NOW(), NOW() + INTERVAL 1 DAY, NOW(), NOW()
FROM Resource WHERE Resource.available = 0;
