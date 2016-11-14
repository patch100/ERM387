
# __Entreprise Resource Management system__
SOEN 387 - Final Project

## __API Documentation__
Reference for using the ERM endpoints.

## Login
### Login
##### Request
~~~~
POST /login
{
    "username": "usr",
    "password": "pwd"
}
~~~~

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "message": "some_message"  // Ex: Successful login to 'usr'
    }
}
~~~~
_Note_: 
- Failure: redirect to home page/login page
- Success: redirect to account page/resources/calendar (maybe add a preference)

## Users
### List of all Users
##### Request
```
GET /users
```

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "users": [
            {
                "id": "2143210",
                "first_name": "Name",
                "email": "an_email@email.com",
                "last_name": "LastName",
                "phone_number": "11111111",
                "is_admin": true,
                "type": "type"
            },
            {
                "id": "432124123",
                "first_name": "Name",
                "last_name": "LastName",
                "email": "another_email@gmail.com",
                "phone_number": "19992222",
                "is_admin": false,
                "type": "another_type"
            }
        ]
    }
}
~~~~

### Get one User's details
#### Request
Filter users on _id_
```
GET /users/:id
```

#### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "user": {
            "id": "31230123",
            "first_name": "Name",
            "last_name": "LastName",
            "email": "an_email@email.com",
            "phone": "13334444",
            "is_admin": true,
            "type": "type"
        }
    }
}
~~~~

### Create a User

##### Request
~~~~
POST /users
body:
{
    "user": {
        "first_name": "Name",
        "last_name": "LastName",
        "email": "an_email@email.com",
        "phone": "13334444",
        "is_admin": true        // This only works if logged in as an admin
    }
}
~~~~

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "message": "some_message"  // Example: Successfully created account
    }
}
~~~~

_Note_: This should technically send a confirmation link via e-mail and then activate the account by following the link or pasting a code on the ERM website. We might not have time to complete this part.

### Modify a User

##### Request
~~~~
POST /users/:id

{
    "user": {
        "first_name": "Name",
        "last_name": "LastName",
        "email": "an_email@email.com",
        "phone": "13334444",
        "is_admin": true        // This only works if logged in as an admin
    }
}
~~~~
_Note_: Only put the fields to modify.

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "message": "some_message"  // Example: Successfully modified account id #
    }
}
~~~~

### Delete a User

##### Request
~~~~
DELETE /users/:id
~~~~

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "message": "some_message"  // Example: Successfully deleted account
    }
}
~~~~


## Inventory

### List Inventory (all Resources)
##### Request
~~~~
GET /inventory
~~~~

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "resources": [
            {
                "type": "",
                "id": "2351",
                // Optional
                "operating_system": "some_os",
                "ram": decimal,
                "storage": decimal,
                "is_printable": true,
                "available": true,
                "is_it": true
            },
            {
                "type": "",
                "id": "23122431",
                // Optional
                "operating_system": "some_os",
                "ram": decimal,
                "storage": decimal,
                "is_printable": true,
                "available": true,
                "is_it": true
            }
        ]
    }
}
~~~~

### List all Resources of a type
##### Request
~~~~
GET /inventory/:type
~~~~

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "resources": [
            {
                "type": "",
                "id": "2351",
                // Optional
                "operating_system": "some_os",
                "ram": decimal,
                "storage": decimal,
                "is_printable": true,
                "available": true,
                "is_it": true
            },
            {
                "type": "",
                "id": "23122431",
                // Optional
                "operating_system": "some_os",
                "ram": decimal,
                "storage": decimal,
                "is_printable": true,
                "available": true,
                "is_it": true
            }
        ]
    }
}
~~~~

### Show a resource's details
##### Request
~~~~
GET /inventory/:type/:id
GET /inventory/:id
~~~~

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "resource": {
            "type": "some_type",  // computer | projector | whiteboard
            "id": "23511",
            // Optional
            "operating_system": "some_os",
            "ram": decimal,
            "storage": decimal,
            "is_printable": true,
            "available": true,
            "is_it": true
        }
    }
}
~~~~

### Create a Resource
##### Request
~~~~
POST /inventory
POST /inventory/:type
{
    "resource": {
        "type": "some_type",  // computer | projector | whiteboard
        // Optional
        "ram": decimal,
        "storage": decimal,
        "operating_system": "some_os",
        "is_it": true
    }
}
~~~~

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
            "message": "some_message"  // Ex: Successfully created a new Resource
    }
}
~~~~

### Modify a Resource
##### Request
~~~~
POST /inventory/:id
POST /inventory/:type/:id
{
    "resource": {
        "type": "",
        // Optional (modify wanted fields here)
        "ram": decimal,
        "storage": decimal,
        "operating_system": "some_os",
        "is_it": true
    }
}
~~~~

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "message": "some_message"  // Ex: Successfully modified Resource
    }
}
~~~~

### Delete a Resource
##### Request
~~~~
DELETE /inventory/:id
DELETE /inventory/:type/:id
~~~~

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "message": "some_message"  // Ex: Successfully deleted a Resource
    }
}
~~~~

## Rooms

### List all Rooms (or All Rooms of a Type)
##### Request
~~~~
GET /rooms
GET /rooms/:type
~~~~

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "rooms": [
            {
                "id": "7227",
                "type": "type",
                "height": decimal,
                "width": decimal,
                "length": decimal,
                "capacity": integer,
                "room_number": "number",
                "equipments": [
                    {
                        "id": "8",
                        "type": "",
                        "is_printable": true,
                        "ram": decimal,
                        "storage": decimal,
                        "operating_system": "some_os"
                    },
                    {
                        "id": "2",
                        "type": "",
                        "is_printable": true,
                        "ram": decimal,
                        "storage": decimal,
                        "operating_system": "some_os"
                    }
                ]
            },
            {
                "id": "7135227",
                "type": "type",
                "height": decimal,
                "width": decimal,
                "length": decimal,
                "capacity": integer,
                "room_number": "number",
                "equipments": [
                    {
                        "id": "0098",
                        "type": "",
                        "is_printable": true,
                        "ram": decimal,
                        "storage": decimal,
                        "operating_system": "some_os"
                    },
                    {
                        "id": "21340",
                        "type": "",
                        "is_printable": true,
                        "ram": decimal,
                        "storage": decimal,
                        "operating_system": "some_os"
                    }
                ]
            }
        ]
    }
}
~~~~


### Show a Room's details
##### Request
~~~~
GET /rooms/:id
GET /rooms/:type/:id
~~~~

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "room": {
            "id": "7135227",
            "type": "type",
            "height": decimal,
            "width": decimal,
            "length": decimal,
            "capacity": integer,
            "room_number": "number",
            "equipments": [
                {
                    "id": "0098",
                    "type": "",
                    "is_printable": true,
                    "ram": decimal,
                    "storage": decimal,
                    "operating_system": "some_os"
                },
                {
                    "id": "21340",
                    "type": "",
                    "is_printable": true,
                    "ram": decimal,
                    "storage": decimal,
                    "operating_system": "some_os"
                }
            ]
        }
    }
}
~~~~


### Create a Room
##### Request
~~~~
POST /rooms
POST /rooms/:type
{
    "room": {
        "type": "type",
        "height": decimal,
        "width": decimal,
        "length": decimal,
        "capacity": integer,
        "room_number": "number",
        "equipments": [
            {
                // Assign an already existing equipment
                "id": "0098",
            },
            {
                // Create a new equipment
                "type": "",
                "is_printable": true,
                "ram": decimal,
                "storage": decimal,
                "operating_system": "some_os"
            }
        ]
    }
}
~~~~
_Note_: Some of these are optional

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "message": "some_message"  // Ex: Successfully created a Room
    }
}
~~~~


### Modify a Room's details
##### Request
~~~~
POST /rooms/:id
POST /rooms/:type/:id
{
    "room": {
        "type": "type",
        "height": decimal,
        "width": decimal,
        "length": decimal,
        "capacity": integer,
        "room_number": "number",
        "equipments": [
            {
                "id": "0098",
                "type": "",
                "is_printable": true,
                "ram": decimal,
                "storage": decimal,
                "operating_system": "some_os"
            },
            {
                "id": "1230",
                "type": "",
                "is_printable": true,
                "ram": decimal,
                "storage": decimal,
                "operating_system": "some_os"
            }
        ]
    }
}
~~~~
_Note_: Only POST details to modify and Equipments to modify

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "message": "some_message"  // Ex: Successfully modified Room
    }
}
~~~~


### Delete a Room
##### Request
~~~~
DELETE /rooms/:id
DELETE /rooms/:type/:id
~~~~

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "message": "some_message"  // Ex: Successfully deleted a Room
    }
}
~~~~


### Delete a Room Equipment
##### Request
~~~~
DELETE /equipments/:id
~~~~

##### Response
~~~~
HTTP/1.1 200 OK
{
    "status": true,
    "body": {
        "message": "some_msg"  // Ex: Successfully deleted the Equipment
    }
}
~~~~


## Errors
All errors will return the following:
~~~~
HTTP/1.1 200 OK
{
    "status": false,
    "body": {
        "error": "some_message"
    }
}
~~~~

