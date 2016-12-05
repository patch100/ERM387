"use strict";
const models = require('../models/index');
const resourceEndpoint = require('./resources');

module.exports = {
  getRooms: getRooms,
  getRoomsByType: getRoomsByType,
  getRoomById: getRoomById,
  //getRoomItems: getRoomItems,
  getRoomTypes: getRoomTypes,
  addRoomReservation:addReservation,
  cancelReservation: cancelReservation
}

function getRooms(type, filters) {
  var roomFilters = filters || {}
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
        include: [
          {
            model: models.ReservationResource,
            include: [
              {
                model: models.Resource,
                include:[
                  { model: models.Computer, required: false },
                  { model: models.WhiteBoard, required: false },
                  { model: models.Projector, required: false }
                ],
                required: false
              }
            ],
            required: false
          }
        ],
        where: {
          endtime: {
            $gte: new Date()
          }
        },
        required: false
      }]
  }).then(resources => {
    if (resources) {
      var resourcesArr = [];
      for (var i = 0; i < resources.length; i++) {
        resourcesArr.push(mapResource(resources[i]))
      }
      return resourcesArr;
    } else {
      return null;
    }
  }).catch(err => {
    return null;
  });
}

function mapResource(resource) {
    if (resource.Reservations && resource.Reservations.length > 0) {
      let reservations = resource.Reservations.map(function (reservation){
        reservation.ReservationResources = reservation.ReservationResources || [];
        let reservationResources = reservation.ReservationResources.map(function (reservationResource){
          let resource = reservationResource.Resource;
          let type = resource.resourceType;
          let resourceObj = {};
          resourceObj[type] = {};
          resourceObj.resourceType = type;
          resourceObj.resourceId = resource.resourceId;
          resourceObj.isIt = resource.isIt;

          switch(type){
            case "Computer":
              resourceObj[type].operating_system = resource[type].operatingSystem;
              resourceObj[type].ram = resource[type].RAM;
              resourceObj[type].storage = resource[type].storage;
              break;
            case "Projector":
              break;
            case "WhiteBoard":
              resourceObj[type].is_printable = resource[type].isPrintable;
              break;
            default:
              break;
          }
          return resourceObj
        });
        return {
            reservation_id: reservation.reservationId,
            user_id: reservation.userId,
            start_time: reservation.startTime,
            end_time: reservation.endTime,
            items: reservationResources
          }
      });
      return addRoomProperties(resource, reservations);
    } else{
      return addRoomProperties(resource, []);
    }
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

// function getRoomResources(roomId) {
//   return models.Reservation.findAll({
//     where: {
//       roomId: roomId,
//       endTime: {
//         $gte: new Date()
//       }
//     },
//     include: [{
//       model: models.Resource,
//       require: true,
//       include: [
//         { model: models.Computer, required: false },
//         { model: models.WhiteBoard, required: false },
//         { model: models.Projector, required: false }
//       ]
//     }]
//   });
// }

// function getRoomItems(id) {
//   return getRoomById(id).then(room => {
//     return {
//       id: room.id,
//       equipments: room.equipments
//     }
//   });
// }

function getRoomById(id) {
  return models.Resource.findOne({
    where: {
      resourceId: id
    },
    include: [
      {
        model: models.Room,
        required: true,
      },
      {
        model: models.Reservation,
        include: [
          {
            model: models.ReservationResource,
            include: [
              {
                model: models.Resource,
                include:[
                  { model: models.Computer, required: false },
                  { model: models.WhiteBoard, required: false },
                  { model: models.Projector, required: false }
                ],
                required: false
              }
            ],
            required: false
          }
        ],
        where: {
          endtime: {
            $gte: new Date()
          }
        },
        required: false
      }]
  }).then(resource => {
    if(resource){
      return mapResource(resource);
    }
    else{
      return null;
    }
  })
  .catch(err => {
    return null;
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

// function addRoomItem(roomId, resourceId) {
//   return models.RoomEquipment.create({
//     roomId: roomId,
//     equipmentId: resourceId
//   }).then(roomItem => {
//     return roomItem != null
//   })
// }

// function removeRoomItem(resourceId, roomId) {
//   return models.RoomEquipment.destroy({
//     where: {
//       equipmentId: resourceId,
//       roomId: roomId
//     }
//   }).then(affectedRows => {
//     return true;
//   })
// }

//Expected (Object: roomId,startTime,endTime,user)
//Return reservationId, status

function addReservation(room){
  return models.Reservation.create({
      resourceId:room.reserveId,
      startTime:room.startTime,
      endTime:room.endTime,
      userId:room.user
  }).then(function(reserve){
    var reserveRoom = {reserveId:reserve.reservationId,status:"pass"}
    return reserveRoom;
  }).catch(function(){
    var reserveRoom = {reserveId:null,status:"failed"}
    return reserveRoom;
  });
}

//Expecting {reservationId, resourceId}
function cancelReservation(reservation){
  return models.Reservation.destroy({where: { reservationId: reservation.reservationId, resourceId: reservation.resourceId}})
    .then(function(){
    return {reservationId: reservation.reservationId, resourceId: reservation.resourceId, status:"pass"};
  }).catch(function(){
    return {reservationId: reservation.reservationId, resourceId: reservation.resourceId, status:"failed"};
  });
}
