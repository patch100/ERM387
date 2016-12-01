"use strict";
const models = require('../models/index');

module.exports = {
  getResourceTypes: getResourceTypes,
  getResourcesByType: getResourcesByType,
  getResources: getResources,
  getResourceById: getResourceById,
  addResource: addResource,
  removeResource: removeResource,
  addPropertiesByType: addPropertiesByType,
  cancelReservation: cancelReservation,
  updateResource: update,
  getReservations: getReservations,
  getReservationById: getReservationById
}

function getResourceTypes(){
  return Promise.resolve(['Computer', 'Projector', 'Room', 'WhiteBoard']);
  //We should actually return the defined types.
  //That only sends the types that we have in the db..
  // return models.Resource.findAll({
  //   attributes: ['resourceType'], 
  //   group: ['resourceType']  
  // }).then(resources => {
  //   var mappedResources = [];
  //   if(resources){
  //     mappedResources = resources.map(resource => {return resource.resourceType}).sort();
  //   }
  //   return mappedResources;
  // })
}

function getResourcesByType(type){
  return getResources(type);
}

function getResources(type) {
  var typeFilter = type ? {resourceType: type} : {};
  var includeObj = getIncludeByType(type);
  return models.Resource.findAll({
    where: typeFilter,
    include:includeObj}).then(resources => {
    if(resources){
      var items = [];
      for(var i = 0; i < resources.length; i++){
        var element = {}
        var resource = resources[i];

        element = addPropertiesByType(resource);
        element.Reservation = JSON.stringify(getReservation(resource));
        items.push(element);    
      }
      return items;
    }
    else{
      return null;
    }
  });
}


function getResourceById(id){
  return models.Resource.findById(id, {
      include: [
        {model: models.Computer, required: false},
        {model: models.Projector, required: false},
        {model: models.WhiteBoard, required: false},
        {model: models.Reservation, required: false},
        {model: models.ReservationResource, required: false, include:[{model: models.Reservation, required: false}]}
        ]}).then( resource => {
    if(resource){
      //console.log(JSON.stringify(resource));
      var mappedResource = {};
      mappedResource = addPropertiesByType(resource);
      mappedResource.Reservation = getReservation(resource);
      return mappedResource;
    }
    else{
      return null;
    }
  })
}

function getReservation(resource){
      var reservations = resource.Reservations;
      var items = [];
      for(var i = 0; i < reservations.length; i++){
          var reservation = reservations[i];
          items.push(getReservationDetail(reservation));
      }

      for(var i = 0; i < resource.ReservationResources.length; i++){
        var reservation = resource.ReservationResources[i].Reservation;
        items.push(getReservationDetail(reservation));
      }
     return items;
}

function getReservationDetail(reservation){
  var res = {};
    res.reservation_id = reservation.reservationId;
    res.id = reservation.resourceId;
    res.user_id = reservation.userId;
    res.start_time = reservation.startTime;
    res.end_time = reservation.endTime;
    res.room_id = reservation.roomId;

  return res;
}

function addResource(resource){
  var resourceType = resource.type.charAt(0).toUpperCase() + resource.type.slice(1);
  var includeObj = getIncludeByType(resourceType);
  var resourceObj = createResourceObj(resourceType, resource);
  return models.Resource.create(resourceObj, {include: includeObj})
    .then(resource => {
    return addPropertiesByType(resource);
  });
}

function removeResource(id){
  return models.Resource.destroy({
    where: {
      resourceId: id
    }
  }).then(affectedRows => {
    return true;
  });
}

function createResourceObj(type, resource){
  var resourceObj = {};
  resourceObj[type] = {};
  resourceObj.resourceType = type;
  resourceObj.isIt= resource.is_it || false;
  switch(type){
    case "Computer":
      resourceObj[type].operatingSystem = resource.operating_system;
      resourceObj[type].RAM = resource.ram;
      resourceObj[type].storage = resource.storage;
      break;
    case "Projector":
      break;
    case "WhiteBoard":
      resourceObj[type].isPrintable = resource.isPrintable;
      break;
    case "Room":
      resourceObj[type].height = resource.height;
      resourceObj[type].length = resource.length;
      resourceObj[type].width = resource.width;
      resourceObj[type].capacity = resource.capacity;
      resourceObj[type].roomNumber = resource.roomNumber;
    default:
      break;
  }
  return resourceObj;
}

function removeResource(id){
  return models.Resource.destroy({
    where: {
      resourceId: id
    }
  }).then(affectedRows => {
    return true;
  });
}

function addPropertiesByType(resource){
  var res = {};
  res.type = resource.resourceType;
  res.is_it = resource.isIt;
  res.id = resource.resourceId;
  switch(resource.resourceType){
    case "Computer":
      res.operatingSystem = resource.Computer.operatingSystem;
      res.RAM = resource.Computer.RAM;
      res.storage = resource.Computer.storage;
      break;
    case "Projector":
      break;
    case "WhiteBoard":
      res.isPrintable = resource.WhiteBoard.isPrintable;
      break;
    case "Room":
      res.height = resource.height;
      res.length = resource.length;
      res.width = resource.width;
      res.capacity = resource.capacity;
      res.roomNumber = resource.roomNumber;
  }
  return res;
}

function getIncludeByType(type){
  var includeObj = [];
  includeObj.push( {model: models.Reservation, where: { endTime: {$gte: new Date()}}, required: false});
  includeObj.push( {model: models.ReservationResource, required: false, include: [{model: models.Reservation, where: { endTime: {$gte: new Date()}}, required: false}]});
  switch(type){
    case "Computer":
      includeObj.push({model: models.Computer, required: true});   
      break;
    case "Projector":
      includeObj.push({model: models.Projector, required: true});
      break;
    case "WhiteBoard":
      includeObj.push({model: models.WhiteBoard, required: true});
      break;
    case "Room":
      includeObj.push({model: models.Room, required: true});
      break;
    default:
      includeObj.push({model: models.Computer, required: false});
      includeObj.push({model: models.Projector, required: false});
      includeObj.push({model: models.WhiteBoard, required: false});
      includeObj.push({model: models.Room, required: false});
      break;
  }
  return includeObj;
}

function cancelReservation(reservation){
  //If independent reservation
  return models.Reservation.destroy({where: {reservationId: reservation.reservationId, resourceId: reservation.resourceId}})
    .then(() => {
      //If part of a room
      return models.ReservationResource.destroy({where: {reservationId: reservation.reservationId, resourceId: reservation.resourceId}});
    }).then(() => {
      return {reservationId: reservation.reservationId, resourceId: reservation.resourceId, status:"pass"}; 
    }).catch((err) => {
      return {reservationId: reservation.reservationId, resourceId: reservation.resourceId, status:"failed"};  
    });
}


function update(resourceId, modifyProperties) {
  return models.Resource.findById(resourceId)
    .then(resource => {
      if (resource) {
        var updatedModel = {};
        for (var property in modifyProperties) {
          if (modifyProperties.hasOwnProperty(property)) {
            updatedModel[toCamelCase(property)] = modifyProperties[property];
          }
        }
        console.log(updatedModel);
        return updateModelByType(resource.resourceType, resource.resourceId, updatedModel);
      }else{
        return {status: "fail"};
      }
    });
}

function updateModelByType(type, resourceId, updatedModel){
  return new Promise((resolve, reject) => {
    switch(type) {
      case "Computer":
        resolve(models.Computer.update(updatedModel, {where: {resourceId: resourceId}, logging: true}));
        break;
      case "WhiteBoard":
        resolve(models.WhiteBoard.update(updatedModel, {where: {resourceId: resourceId}, logging: true}));
        break;
      case "Projector":
        resolve(models.Projector.update(updatedModel, {where: {resourceId: resourceId}, logging: true}));
        break;
      case "Room":
        resolve(models.Room.update(updatedModel, {where: {resourceId: resourceId}}))
      default:
        reject("Type not found");
        break;
    }
  })
  .then(updatedRows => {console.log("HERE :) "); return {status: "success"};})
  .catch((err) => { console.log(err); return {status: "fail"};});
}

function toCamelCase(str){
  return str.replace(/_([a-z])/g, function (m, w) {
    return w.toUpperCase();
  });
}

function getReservations(){
  return models.Reservation.findAll({
    model: models.Reservation,
    include: [
      {
        model: models.ReservationResource,
        include: [
          {
            model: models.Resource,
            include:[
              { model: models.Room, required: false },
              { model: models.Computer, required: false },
              { model: models.WhiteBoard, required: false },
              { model: models.Projector, required: false }
            ], 
            required: false
          }
        ],
      },
      {
        model: models.Resource,
        include: [
          {
            model: models.Room,
            required: true
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
  }).then(reservations => {
    if (reservations) {
      var resPromises = [];
      for (var i = 0; i < reservations.length; i++) {
        resPromises.push(mapResource(reservations[i]))
      }
      return resPromises;
    } else {
      return null;
    }
  });
}

function getReservationById(reservationId){
  return models.Reservation.findOne({
    model: models.Reservation,
    include: [
      {
        model: models.ReservationResource,
        include: [
          {
            model: models.Resource,
            include:[
              { model: models.Room, required: false },
              { model: models.Computer, required: false },
              { model: models.WhiteBoard, required: false },
              { model: models.Projector, required: false }
            ], 
            required: false
          }
        ],
      },
      {
        model: models.Resource,
        include: [
          {
            model: models.Room,
            required: true
          }
        ],
        required: false
      }
    ],
    where: {
      reservationId: reservationId
    },
    required: false
  }).then(reservation => {
    if (reservation) {
      return mapResource(reservation);
    } else {
      return null;
    }
  });
}

function mapResource(reservation) {
    let reservationResources = [];
    let room = {};

    if (reservation.ReservationResources && reservation.ReservationResources.length > 0) {

        reservationResources = reservation.ReservationResources.map(function (reservationResource){
          let resource = reservationResource.Resource;
          let type = resource.resourceType;
          let resourceObj = {};
          resourceObj[type] = {};
          resourceObj.resourceType = type;
          resourceObj.resourceId = resource.resourceId;
          resourceObj.isIt = resource.isIt;

          switch(type){
            case "Computer":
              resourceObj[type].operatingSystem = resource[type].operatingSystem;
              resourceObj[type].RAM = resource[type].RAM;
              resourceObj[type].storage = resource[type].storage;
              break;
            case "Projector":
              break;
            case "WhiteBoard":
              resourceObj[type].isPrintable = resource[type].isPrintable;
              break;
            case "Room":
              resourceObj[type].height = resource.height;
              resourceObj[type].length = resource.length;
              resourceObj[type].width = resource.width;
              resourceObj[type].capacity = resource.capacity;
              resourceObj[type].roomNumber = resource.roomNumber;
              break;
            default:
              break;
          }
          return resourceObj
        });
    }
    if(reservation.Resource && reservation.Resource.resourceType === 'Room'){
      room = addRoomProperties(reservation.Resource)
    }
    
    return {
      reservationId: reservation.reservationId,
      room: room,
      userId: reservation.userId,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      items: reservationResources
    }
}

function addRoomProperties(resource) {
  return {
    id: resource.resourceId,
    roomId: resource.Room.roomId,
    type: resource.Room.roomType,
    roomNumber: resource.Room.roomNumber,
    capacity: resource.Room.capacity,
    length: resource.Room.length,
    width: resource.Room.width,
    height: resource.Room.height,
  }
}