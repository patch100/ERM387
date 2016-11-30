"use strict";
const models = require('../models/index');
const resourceEndpoint = require('./resources');

module.exports = {
  getRooms: getRooms,
  getRoomsByType: getRoomsByType,
  getRoomById: getRoomById,
  getRoomItems: getRoomItems,
  getRoomTypes: getRoomTypes
}

function getRooms(type) {
  var typeFilter = type ? { roomType: type } : {};
  return models.Resource.findAll({
    where: {
      resourceType: 'Room'
    },
    include: [
      {
        model: models.Room,
        required: true,
        where: typeFilter,
      },
      {
        model: models.Reservation,
        where: {
          endtime: {
            $gte: new Date()
          }
        },
        required: false
      }]
  }).then(resources => {
    if (resources) {
      var resPromises = [];
      for (var i = 0; i < resources.length; i++) {
        resPromises.push(mapResource(resources[i]))
      }
      return Promise.all(resPromises);
    } else {
      return null;
    }
  });
}

function mapResource(resource) {
  return new Promise((resolve, reject) => {
    if (resource.Reservations) {
      getRoomResources(resource.Room.roomId).then(function (roomItems) {
        //HERE 1
        console.log(roomItems.length);
        for( var i = 0; i < resource.Reservations.length; i++){
          //HERE 0 ???????
          console.log(roomItems.length);
        }

        //  var reservations = resource.Reservations.map(roomRes => {
        //   if (roomItemssss && roomItemssss.length > 0) {
        //     items = roomItemssss.filter(res => res.reservationId === roomRes.reservationId).map(resourceEndpoint.addPropertiesByType);
        //   }
        //   return {
        //     reservation_id: roomRes.reservationId,
        //     user_id: roomRes.userId,
        //     start_time: roomRes.startTime,
        //     end_time: roomRes.endTime,
        //     items: items || []
        //   }
        // });
        resolve(addRoomProperties(resource, []));
      });
    } else {
      resolve(addRoomProperties(resource, []));
    }
  })
}

function addRoomProperties(resource, reservations) {
  return {
    id: resource.resourceId,
    room_id: resource.Room.roomId,
    type: resource.Room.roomType,
    room_number: resource.Room.roomNumber,
    capacity: resource.Room.capacity,
    length: resource.Room.length,
    width: resource.Room.width,
    height: resource.Room.height,
    reservations: reservations,
  }
}

function getRoomResources(roomId) {
  return models.Reservation.findAll({
    where: {
      roomId: roomId,
      // endTime: {
      //   $gte: new Date()
      // }
    },
    include: [{
      model: models.Resource,
      require: true,
      include: [
        { model: models.Computer, required: false },
        { model: models.WhiteBoard, required: false },
        { model: models.Projector, required: false }
      ]
    }]
  });
}

function getRoomItems(id) {
  return getRoomById(id).then(room => {
    return {
      id: room.id,
      equipments: room.equipments
    }
  });
}

function getRoomById(id) {
  console.log(id);
  return models.Resource.findOne({
    where: {
      resourceId: id
    },
    include: [{
      model: models.Room,
      required: true,
      include: [{
        model: models.Equipment,
        required: false,
        include: [
          { model: models.Computer, required: false },
          { model: models.Projector, required: false },
          { model: models.WhiteBoard, required: false }]
      }]
    }]
  }).then(resource => {
    var mappedRoom = {};
    if (resource) {
      var items = [];
      for (var i = 0; i < resource.Room.Equipment.length; i++) {
        var equipment = resource.Room.Equipment[i];
        if (equipment.Computer) {
          items.push({ type: "Computer", id: equipment.resourceId, RAM: equipment.Computer.RAM, storage: equipment.Computer.storage, operatingSystem: equipment.Computer.operatingSystem });
        } else if (equipment.Projector) {
          items.push({ type: "Projector", id: equipment.resourceId, });
        } else if (equipment.WhiteBoard) {
          items.push({ type: "WhiteBoard", id: equipment.resourceId, isPrintable: equipment.WhiteBoard.isPrintable });
        }
      }

      mappedRoom = {
        type: resource.Room.roomType,
        id: resource.resourceId,
        height: resource.Room.height,
        width: resource.Room.width,
        length: resource.Room.length,
        capacity: resource.Room.capacity,
        room_number: resource.Room.roomNumber,
        availability: resource.available,
        equipments: items
      }
    }
    return mappedRoom;
  })
}

function getRoomTypes() {
  return models.Room.findAll({ attributes: ['roomType'], group: ['roomType'] }).then(rooms => {
    var mappedRooms = [];
    if (mappedRooms) {  // BUG: isnt it supposed to be if rooms?
      mappedRooms = rooms.map(room => room.roomType).sort()
    }
    return mappedRooms;
  })
}

function getRoomsByType(type) {
  return getRooms(type);
}

function addRoomItem(roomId, resourceId) {
  return models.RoomEquipment.create({
    roomId: roomId,
    equipmentId: resourceId
  }).then(roomItem => {
    return roomItem != null
  })
}

function removeRoomItem(resourceId, roomId) {
  return models.RoomEquipment.destroy({
    where: {
      equipmentId: resourceId,
      roomId: roomId
    }
  }).then(affectedRows => {
    return true;
  })
}