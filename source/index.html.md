---
title: Enterprise Resource Management

toc_footers:
  - <a href='#'>Sign up to use our API</a>
  - <a href='https://github.com/sorryeh/ERM387'>View on Github</a>

includes:
  - errors

search: true
---

# Introduction

Welcome to our documentation! You can use our API to access ERM endpoints, which can get information on various Resources, Rooms and Users in our database.

<aside class="notice">
  Notice:
  <BR>
  Assume {"status": true, "body": { } } is wrapping all JSON Responses
  <BR>
  (If it is missing from the Response JSON)
</aside>

# Login
> `POST /login`

```json
{
    "user_id": "email",
    "user_password": "pwd"
}
```

> Response JSON:

> The 'token': 'qwdklwqkqwklqw' will be in the Cookies

```json
{
    "status": true,
    "body": {
        "message": "Successful login!"
    }
}
```

<aside class="success">
<BR>
In case of success, front end needs to redirect to Account/Resouces/Calendar.
<BR>
Pass Token for future requests (in the Cookies).
<BR>
Valid 24 hours.
</aside>

<aside class="warning">
<BR>
In case of failure, front end needs to redirect to Login page.
<BR>
A generic error will be returned.
</aside>

# Users
## Get all Users

> `GET /users`

> Response JSON:

```json
{
    "status": true,
    "body": {
        "users": [
            {
                "user_id": "int",
                "first_name": "string",
                "email": "string@email.com",
                "last_name": "string",
                "phone": "int",
                "is_admin": true,
                "type": "string",
                "reservations": [
                  {
                    "reservation_id": "int",
                    "resource_id": "int",
                    "room_id": "int",
                    "date_start": "date_string",
                    "date_end": "date_string"
                  },
                  //...
                ]
            },
            //...
        ]
    }
}
```

This end point retrieves all Users.

If `users` or `reservations` is empty: [ ]

`room_id` could be swapped for full room details (under reservations)

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
first_name  | null  | A string that must be in the first name
last_name   | null  | A string that must be in the last name
email       | null  | The email address (i.e. example or example.com --> @example.com)
is_admin    | null  | True or False for type of account
phone       | null  | A part of the phone number

## Get a Specific User

> `GET /users/:user_id`

> Response JSON:

```json
{
    "status": true,
    "body": {
        "user": {
          "user_id": "int",
          "first_name": "string",
          "email": "string@email.com",
          "last_name": "string",
          "phone": "int",
          "is_admin": true,
          "type": "string",
          "reservations": [
            {
              "reservation_id": "int",
              "resource_id": "int",
              "date_start": "date_string",
              "date_end": "date_string"
            },
            //...
          ]
        }
    }
}
```

This endpoint retrieves a specific user.

<aside class="success">
<BR>
date_start and date_end format is epoch time
<BR>
</aside>

If `users` or `reservations` is empty: [ ]

`room_id` could be swapped for full room details (under reservations)

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the user to retrieve

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
first_name  | null  | A string that must be in the first name
last_name   | null  | A string that must be in the last name
email       | null  | The email address (i.e. example or example.com --> @example.com)
is_admin    | null  | True or False for type of account
phone       | null  | A part of the phone number

## Create a User

> `POST /users`

```json
{
  "user": {
    "email": "string@email.com", // Unique
    "password": "string", // Password
    "first_name": "string",
    "last_name": "string",
    "phone": "int",
    "is_admin": true,
    "type": "string"
  }
}
```

> Response JSON:

```json
{
  "status": true,
  "body": {
    "message": "Successfully created user!"
  }
}
```

This endpoint creates a user.

<aside class="warning">
  On failure, returns a generic error.
</aside>

<aside class="notice">
  We should have a registration page/flow.
  <BR>
  When successful, a confirmation link could be sent via email.
  <BR>
  To activate the account, the user should follow the link.
  <BR>
  This will be done if time permits.
</aside>

## Modify a User

> `POST /users/:user_id`

```json
{
  "user": {
    //...
  }
}
```

The body of the POST should only contain fields to be modified.
<BR>
You cannot modify reservations in this way.

> Response JSON:

```json
{
  "status": true,
  "body": {
    "message": "Successfully modified the User."
  }
}
```

This endpoint modifies a user.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the user to modify

## Delete a User

> `DELETE /users/:user_id`

> Response JSON:

```json
{
  "status": true,
  "body": {
    "message": "Successfully deleted the User."
  }
}
```

This endpoint deletes a user.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the user to delete

# Resources

## Get all Resources

> `GET /inventory`

> Response JSON: 

```json
{
  "resources": [
      {
        "type": "string",
        "resource_id": "int",
        "it_resource": false,
        // Optional (depends on type of Resource)
        "operating_system": "string",
        "ram": "decimal",
        "storage": "decimal",
        "printable": true,
        "available": false,
        "reservations": [
          {
            "reservation_id": "int",
            "user_id": "int",
            // epoch time ==> date_string
            "date_start": "date_string",
            "date_end": "date_string"
          },
          //...
        ]
      },
      //...
  ]
}
```
<aside class="notice">
  Note:<BR>
  Assume {"status": true, "body": { } } is wrapping all future JSON Responses
</aside>

This endpoint retrieves all resources.

<aside class="warning">
  operating_system, ram, storage, printable, available, it_resource: all optional fields based on the `type`
</aside>

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
available | null | return availability of resources (might include dates) [true or false]
date_start | null | start date to check above availability (requires available flag)
date_end | null | end date to check above availability (requires available flag)
ram | null | ram value
os | null | operating system name
storage | null | storage amount
printable | null | true or false for printable flag
type | null | name of the resource type

## Get all Resources of one type

> `GET /inventory/:type`

> The possible types: Computer or Projector or Whiteboard

> Response JSON:

```json
{
  "resources": [
      {
        "type": "string",
        "resource_id": "int",
        "it_resource": false,
        // Optional
        "operating_system": "string",
        "ram": "decimal",
        "storage": "decimal",
        "printable": true,
        "available": false,
        "reservations": [
          {
            "reservation_id": "int",
            "user_id": "int",
            // Epoch time
            "date_start": "date_string",
            "date_end": "date_string"
          },
          //...
        ]
      },
      //...
  ]
}
```

This endpoint retrieves all resources of a specified type.

<aside class="warning">
  operating_system, ram, storage, printable, available, it_resource: all optional fields based on the `type`
</aside>

### URL Parameters

Parameter | Description
--------- | -----------
type | The type of the resources to retrieves

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
available | null | return availability of resources (might include dates) [true or false]
date_start | null | start date to check above availability (requires available flag)
date_end | null | end date to check above availability (requires available flag)
ram | null | ram value
os | null | operating system name
storage | null | storage amount
printable | null | true or false for printable flag
type | null | name of the resource type

## Get a Specific Resource

> `GET /inventory/:type/:resource_id`

> The possible types are: Projector or Computer or Whiteboard
> The id is the resource_id

> Response JSON:

```json
{
  "resource": {
    "type": "string",
    "resource_id": "int",
    "it_resource": false,
    // Optional
    "operating_system": "string",
    "ram": "decimal",
    "storage": "decimal",
    "printable": true,
    "available": false,
    "reservations": [
      {
        "reservation_id": "int",
        "user_id": "int",
        // Epoch time
        "date_start": "date_string",
        "date_end": "date_string"
      },
      //...
    ]
  }
}
```

This endpoint retrieves a resource.

<aside class="warning">
  `available` is only displayed when filtering on dates/availability.
</aside>

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the resource to retrieve

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
available | null | return availability of resources (might include dates) [true or false]
date_start | null | start date to check above availability (requires available flag)
date_end | null | end date to check above availability (requires available flag)
ram | null | ram value
os | null | operating system name
storage | null | storage amount
printable | null | true or false for printable flag
type | null | name of the resource type

## Create a Resource

> `POST /inventory`

```json
{
  "resource": {
    "type": "string",
    "it_resource": true,
    // Optional (depends on type)
    "ram": "decimal",
    "storage": "decimal",
    "operating_system": "string",
    "printable": true
  }
}
```

> Response JSON:

```json
{
  "message": "Successfully created a new Resource."
}
```

This endpoint creates a resource.

<aside class="success">
  We could perhaps return the newly created resource's informations in the response.
</aside>

## Modify a Resource

> `POST /inventory/:resource_type/:resource_id`

```json
{
  "resource": {
    //...
  }
}
```

> Response JSON:

```json
{
  "message": "Successfully modified the Resource."
}
```

This endpoint modifies a resource.
<BR>
Reservation information cannot be modified via this endpoint.

<aside class="notice">
  Only POST the fields of the resource to be modified.
</aside>

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the resource to modify

## Delete a Resource

> `DELETE /inventory/:resource_type/:resource_id`

> Response JSON:

```json
{
  "message": "Successfully deleted the Resouce."
}
```

This endpoint deletes a resource.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the resource to delete

## Reserve a Resource

> `POST /inventory/reserve`

```json
{
  "resource_id": "int",
  // Epoch time
  "date_start": "date_string",
  "date_end": "date_string",
  "user_id": "int"
}
```

> Response JSON:

```json
{
  "message": "Successfully reserved the resource.",
  "failed": [ ]
}
```

This endpoint reserves a resource.
<BR>
The resource is tied to a user.
<BR>
Optionally, a room is tied to the reserved resource.
<BR>
The resource can be reserved up to a year in advance.
<BR>
The resource is limited to a 7 day reservation.

## Cancel Reservation of a Resource

> `POST /inventory/cancel`

```json
{
  "reservation_id": "int"
}
```

Pass a list of reservation ids to cancel or a single one.

> Response JSON:

```json
{
  "message": "Successfully cancelled the reservation(s).",
  "failed": [ ]
}
```

This endpoint cancels a reservation for a resource.
<BR>
Deletes the entry of the reservation in the table.

<aside class="warning">
  In the response, you have a list of reservations that failed to cancel.
  <BR>
  If it is empty, then they were all successful.
</aside>

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the reservation to cancel

# Rooms

## Get all Rooms

> `GET /rooms`
> `GET /rooms/:room_type`

> Response JSON:

```json
{
    "status": true,
    "body": {
        "rooms": [
            {
              "id": "int",
              "type": "string",
              "height": "decimal",
              "width": "decimal",
              "length": "decimal",
              "capacity": "int",
              "room_number": "int",
              "reservations": [
                {
                  "reservation_id": "int",
                  "user_id": "int",
                  "room_id": "int",
                  "date_start": "date_string",
                  "date_end": "date_string",
                  "equipments": [
                    {
                      "type": "string",
                      "resource_id": "int",
                      "operating_system": "string",
                      "ram": "decimal",
                      "storage": "decimal",
                      "printable": true,
                      "available": false,
                      "it_resource": false,
                    },
                    //...
                  ]
                },
                //...
              ],
              "available": true
            },
            //...
          ]
    }
}
```

This endpoint retrieves all rooms.

<aside class="notice">
  The `available` field is only present when a filter is applied.
</aside>

### URL Parameters

Parameter | Description
--------- | -----------
type | The type of the rooms to retrieve (optional)

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
available | null | return availability of resources (might include dates) [true or false]
date_start | null | start date to check above availability (requires available flag)
date_end | null | end date to check above availability (requires available flag)
capacity | null | Capacity of the room
height | null | Height of the room
width | null | Width of the room
length | null | Length of the room
room_number | null | Prefix of the room number

## Get a Specific Room

> `GET /rooms/:room_type/:room_id`

> Response JSON:

```json
{
    "status": true,
    "body": {
        "room": {
          "id": "int",
          "type": "string",
          "height": "decimal",
          "width": "decimal",
          "length": "decimal",
          "capacity": "int",
          "room_number": "int",
          "reservations": [
            {
              "reservation_id": "int",
              "user_id": "int",
              "room_id": "int",
              "date_start": "date_string",
              "date_end": "date_string",
              "equipments": [
                {
                  "type": "string",
                  "resource_id": "int",
                  "operating_system": "string",
                  "ram": "decimal",
                  "storage": "decimal",
                  "printable": true,
                  "available": false,
                  "it_resource": false,
                },
                //...
              ]
            },
            //...
          ],
          "available": true
        }
    }
}
```

This endpoint retrieves a room.

<aside class="notice">
  The `available` field is only present when a filter is applied.
</aside>

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the room to retrieve

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
available | null | return availability of resources (might include dates) [true or false]
date_start | null | start date to check above availability (requires available flag)
date_end | null | end date to check above availability (requires available flag)
capacity | null | Capacity of the room
height | null | Height of the room
width | null | Width of the room
length | null | Length of the room
room_number | null | Prefix of the room number


## Create a Room

> `POST /rooms`

```json
{
  "room": {
    "type": "string", //resource type (Room)
    "room_type" : "string", //specific room type
    "height": "decimal",
    "width": "decimal",
    "length": "decimal",
    "capacity": "int",
    "room_number": "int"
  }
}
```

> Response JSON:

```json
{
  "message": "Successfully created a room."
}
```

This endpoint creates a room.

## Modify a Room

> `POST /rooms/:room_type/:room_id`

```json
{
  "room": {
    //...
  }
}
```

> Response JSON:

```json
{
  "message": "Successfully modified Room."
}
```

This endpoint modifies a room.

<aside class="notice">
  Only POST fields to modify.
  <BR>
  This endpoint cannot modify reservations.
</aside>

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the room to modify

## Delete a Room

> `DELETE /rooms/:room_type/:room_id`

> Response JSON:

```json
{
  "message": "Successfully deleted a room."
}
```

This endpoint deletes a room.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the room to delete

## Reserve a Room

> `POST /rooms/reserve`

```json
{
  // Epoch time
  "date_start": "date_string",
  "date_end": "date_string",
  "room_id": "int",
  "user_id": "int",
  "equipments": [
    {
      "resource_id": "int"
    },
    //...
  ]
}
```

> Response JSON:

```json
{
  "message": "Successfully reserved the room.",
  "failed": ["int", ] // resource_id that failed to reserve
}
```

This endpoint reserves a room.
<BR>
The room is tied to a user.
<BR>
Optionally, you can add resource reservations to a room.
<BR>
The reservation can be made up to a year in advance.
<BR>
The reservation can be up to 7 days long.

<aside class="warning">
  If the reservation fails for some equipment in the room, their id's will be returned in the `failed` field (list).
</aside>

## Cancel Reservation of a Room

> `POST /rooms/cancel`

```json
{
  "reservation_id": "int"
}
```

Pass a reservation id (or list) to cancel.

> Response JSON: 

```json
{
  "message": "Successfully reserved the room."
}
```

This endpoint cancels a room reservation.
<BR>
The reservation entry is removed from the Reservations table.

<aside class="warning">
  In the response, you have a list of reservations that failed to cancel.
  <BR>
  If it is empty, then they were all successful.
</aside>

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the reservation to cancel

# Reservations

## Get all Reservations

> `GET /reservations`

> Response JSON:

```json
{
  "reservations": [
    {
      "reservation_id": "int",
      "user_id": "int",
      // Epoch time
      "date_start": "datestring",
      "date_end": "datestring",
      // optional (one or both)
      "room_id": "int",
      "resource_id": "int"
    },
    //...
  ]
}
```

This endpoint retrieves all reservations.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
date_start | null | start date of reservations
date_end | null | end date of reservations
user_id | null | the user id of the reservations to return
room_id | null | the room id of the reservations to return
resource_id | null | the resource id of the reservations to return


## Get a specific Reservation

> `GET /reservations/:reservation_id`

> Response JSON:

````json
{
  "reservation": {
    "reservation_id": "int",
    "user_id": "int",
    // epoch time
    "start_date": "datestring",
    "end_date": "datestring",
    //optional (one or both)
    "room_id": "int",
    "resource_id": "int"
  }
}
````

This endpoint retrieves a specific reservation.

### URL Parameters

Parameter | Description
--------- | -----------
reservation_id | The id of the reservation to retrieve

