const models = require('../models/index');
const rooms = require('./rooms');
const users = require('./users');
//DB CALLS HERE
//I WOULD CREATE A SINGLE ENDPOINT FILE FOR THEM TO use
module.exports = {
    getRooms: rooms.getRooms,
    getRoomsByType: rooms.getRoomsByType,
    getRoomById: rooms.getRoomById,
    getRoomItems: rooms.getRoomItems,
    getRoomTypes: rooms.getRoomTypes,
    getUsers: users.getUsers,
    getUserById: users.getUserById,
    getResourceTypes: getResourceTypes,
    getResourcesByType: getResourcesByType,
    getResources: getResources,
    getResourceById: getResourceById,
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





//Type: computer, projector, etc.
function getResourcesByType(type){
  var includeObj = getIncludeByType(type);
  return models.Resource.findAll({
    where: {
      resourceType: type
    },
    include: [{
      model: models.Equipment,
      include: includeObj
    }]
  }).then(resources => {
      var mappedResources = [];
      if(resources){
        mappedResources = resources.map(resource => {
          var res = {
            availability: resource.available,
            resourceId: resource.resourceId,
            resourceType: resource.resourceType,
            isIt: resource.isIt
          }
          return addPropertiesByType(type, res, resource);
        });
      }
      return mappedResources;
  });
}

function getResources() {
  return models.Resource.findAll({
    include: [{
      all: true
    }]
  }).then( resources => {
      return resources;
    })
}

function getResourceById(id){
  return models.Resource.findById(id).then( resource => {
    if(resource){
      return resource;
    } else {
      return {};
    }
  })
}

function addPropertiesByType(type, res, resource){
  switch(type){
    case "Computer":
      res.operatingSystem = resource.Equipment.Computer.operatingSystem;
      res.RAM = resource.Equipment.Computer.RAM;
      res.storage = resource.Equipment.Computer.storage;
      break;
    case "Projector":
      break;
    case "WhiteBoard":
      res.isPrintable = resource.Equipment.WhiteBoard.isPrintable;
      break;
  }
  return res;
}

function getIncludeByType(type){
  var includeObj = [];
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
  }
  return includeObj;
}
