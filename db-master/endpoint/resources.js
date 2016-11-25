const models = require('../models/index');

module.exports = {
  getResourceTypes: getResourceTypes,
  getResourcesByType: getResourcesByType,
  getResources: getResources,
  getResourceById: getResourceById,
  addResource: addResource,
  removeResource: removeResource
}

function getResourceTypes(){
  return models.Resource.findAll({attributes: ['resourceType'], group: ['resourceType']}).then(resources => {
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
    var mappedResources = {resources : []};
    if(resources){
      var items = [];
      for(var i = 0; i < resources.length; i++){
        var element = {}
        var resource = resources[i];

        element = addPropertiesByType(resource);
        element.Reservation = getReservation(resource);
        items.push(element);    
      }
      mappedResources.resources = items;
    }
    return mappedResources;
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
    var mappedResource = {resource : []};
    if(resource){
      mappedResource = addPropertiesByType(resource);
      mappedResource.Reservation = getReservation(resource);
    }
    return mappedResource;
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
    res.id = reservation.reservationId;
    res.resourceid = reservation.resourceId;
    res.userid = reservation.userId;
    res.startTime = reservation.startTime;
    res.endTime = reservation.endTime;
    res.room = reservation.roomId;

  return res;
}


function addResource(resource){
  var resourceType = resource.type.charAt(0).toUpperCase() + resource.type.slice(1);
  var includeObj = getIncludeByType(resourceType);
  var resourceObj = createResourceObj(resourceType, resource);
  return models.Resource.create(resourceObj, {include: includeObj})
    .then(resource => {
    return resource != null;
  });
}

function addRoom(resource){
  var resourceType = resource.type.charAt(0) + resource.type.slice(1);
  var includeObj = getIncludeByType(resourceType);
  var resourceObj = createResourceObj(resourceType, resource);
  return models.Resource.create({
    resourceType: resourceType,
    isIt: false,
    available: true,
    Equipment: resourceObj
  }, {include: [{
      model: models.Room,
      include: includeObj
    }]
  }).then(resource => {
    return resource != null;
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
  }
  return res;
}


function getIncludeByType(type){
  var includeObj = [];
  switch(type){
    case "Computer":
      includeObj.push({model: models.Computer, required: true});
      includeObj.push( {model: models.Reservation, required: false});     
      break;
    case "Projector":
      includeObj.push({model: models.Projector, required: true});
      includeObj.push( {model: models.Reservation, required: false});
      break;
    case "WhiteBoard":
      includeObj.push({model: models.WhiteBoard, required: true});
      includeObj.push( {model: models.Reservation, required: false});
      break;
    case "Room":
      includeObj.push({model: models.Room, required: true});
      includeObj.push( {model: models.Reservation, required: false});
      break;
    default:
      includeObj.push({model: models.Computer, required: false});
      includeObj.push({model: models.Projector, required: false});
      includeObj.push({model: models.WhiteBoard, required: false});
      includeObj.push( {model: models.Reservation, required: false});
      includeObj.push({model: models.Room, required: false});
      break;
  }
  return includeObj;
}
