const models = require('../models/index');

module.exports = {
  getResourceTypes: getResourceTypes,
  getResourcesByType: getResourcesByType,
  getResources: getResources,
  getResourceById: getResourceById,
  addResource: addResource,
  removeResource: removeResource,
  addPropertiesByType: addPropertiesByType
}

function getResourceTypes(){
  return models.Resource.findAll({
    attributes: ['resourceType'], 
    group: ['resourceType']  
  }).then(resources => {
    var mappedResources = [];
    if(resources){
      mappedResources = resources.map(resource => {return resource.resourceType}).sort();
    }
    return mappedResources;
  })
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
        {model: models.Reservation, required: false}
        ]}).then( resource => {
    if(resource){
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
  includeObj.push( {model: models.Reservation, where: { endDate: {$gte: new Date()}}, required: false});
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


