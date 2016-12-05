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
