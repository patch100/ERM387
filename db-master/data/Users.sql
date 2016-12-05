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
