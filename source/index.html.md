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

# Login
> `POST /login`

```json
{
    "username": "usr",
    "password": "pwd"
}
```

> Response JSON:

```json
{
    "status": true,
    "body": {
        "token": "the_token",
        "message": "Successful login!"
    }
}
```

<aside class="success">
<BR>
In case of success, front end needs to redirect to Account/Resouces/Calendar.
<BR>
Use Token for future requests.
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
                "id": "int",
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
                    "user_id": "int",
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
param | default | desc

## Get a Specific User

> `GET /users/:id`

> Response JSON:

```json
{
    "status": true,
    "body": {
        "user": {
          "id": "int",
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
              "user_id": "int",
              "room_id": "int",
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

If `users` or `reservations` is empty: [ ]

`room_id` could be swapped for full room details (under reservations)

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the user to retrieve

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Create a User

> 

```json
```

> 

```json
```

This endpoint creates a user.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Modify a User

> 

```json
```

> 

```json
```

This endpoint modifies a user.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the user to modify

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Delete a User

> 

```json
```

> 

```json
```

This endpoint deletes a user.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the user to delete

# Resources

## Get all Resources

> 

```json
```

> 

```json
```

This endpoint retrieves all resources.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Get all Resources of one type

> 

```json
```

> 

```json
```

This endpoint retrieves all resources of a specified type.

### URL Parameters

Parameter | Description
--------- | -----------
type | The type of the resources to retrieves

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Get a Specific Resource

> 

```json
```

> 

```json
```

This endpoint retrieves a resource.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the resource to retrieve

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Create a Resource

> 

```json
```

> 

```json
```

This endpoint creates a resource.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Modify a Resource

> 

```json
```

> 

```json
```

This endpoint modifies a resource.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the resource to modify

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Delete a Resource

> 

```json
```

> 

```json
```

This endpoint deletes a resource.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the resource to delete

## Reserve a Resource

> 

```json
```

> 

```json
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

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Cancel Reservation of a Resource

> 

```json
```

> 

```json
```

This endpoint cancels a reservation for a resource.
<BR>
Deletes the entry of the reservation in the table.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the reservation to cancel

# Rooms

## Get all Rooms

> 

```json
```

> 

```json
```

This endpoint retrieves all rooms.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Get all Rooms of one type

> 

```json
```

> 

```json
```

This endpoint retrieves all rooms of a type.

### URL Parameters

Parameter | Description
--------- | -----------
type | The type of the rooms to retrieve

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Get a Specific Room

> 

```json
```

> 

```json
```

This endpoint retrieves a room.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the room to retrieve

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Create a Room

> 

```json
```

> 

```json
```

This endpoint creates a room.

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Modify a Room

> 

```json
```

> 

```json
```

This endpoint modifies a room.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the room to modify

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Delete a Room

> 

```json
```

> 

```json
```

This endpoint deletes a room.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the room to delete

## Reserve a Room

> 

```json
```

> 

```json
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

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
param | default | desc

## Cancel Reservation of a Room

> 

```json
```

> 

```json
```

This endpoint cancels a room reservation.
<BR>
The reservation entry is removed from the Reservations table.

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the reservation to cancel
