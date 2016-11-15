const models = require('../models/index');
const rooms = require('./rooms');
//DB CALLS HERE
//I WOULD CREATE A SINGLE ENDPOINT FILE FOR THEM TO use
module.exports = {
    getRooms: rooms.getRooms,
    getRoomsByType: rooms.getRoomsByType,
    getRoomById: rooms.getRoomById,
    getRoomItems: rooms.getRoomItems,
    getRoomTypes: rooms.getRoomTypes,
    getUsers: getUsers,
    getUserByTypeAndId: getUserByTypeAndId,
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

function getUserByTypeAndId(type, id){
  return models.User.findOne({
    where: {
      userId: id
    },
    include: [{
      model: models.UserType,
      where: {
        typeName: type
      },
      required: true
    }]
  }).then(user => {
    var mappedUser = {};
    if(user){
      mappedUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
        userType: user.UserType.typeName,
      }
    }
    return mappedUser;
  })
}

function getUsers(){
  return models.User.findAll({include: [{model: models.UserType, required:true}]}).then(users => {
    var mappedUsers = {};
    if(users){
      mappedUsers = users.map(user => {
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          userType: user.UserType.typeName,
        }
      });
      return mappedUsers;
    }
  });
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
