INSERT INTO Room (roomType, resourceId, height, width, length, capacity, roomNumber)
SELECT "conference", resourceId, 8, 20, 20, 40, 'H555'
FROM Resource WHERE resourceType = 'Room' ORDER BY resourceId DESC LIMIT 1;

INSERT INTO Room (roomType, resourceId, height, width, length, capacity, roomNumber)
SELECT "meeting", resourceId, 8, 40, 40, 120, 'H890'
FROM Resource WHERE resourceType = 'Room' ORDER BY resourceId ASC LIMIT 1;
