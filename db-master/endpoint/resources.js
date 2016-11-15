const models = require('../models/index');

module.exports = {
  getResourceTypes: getResourceTypes,
  getResourcesByType: getResourcesByType,
  getResources: getResources,
  getResourceById: getResourceById
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
    include: [{
      model: models.Equipment,
      required: true,
      include: includeObj
    }]
  }).then(resources => {
    var mappedResources = {resources : []};
    if(resources){
      var items = [];
      for(var i = 0; i < resources.length; i++){
        var resource = resources[i];
        var equipment = resource.Equipment;
        items.push(addPropertiesByType(resource));
      }
      mappedResources.resources = items;
    }
    return mappedResources;
  });
}

function getResourceById(id){
  return models.Resource.findById(id, {
    include: [{
      model: models.Equipment,
      required: true,
      include: [
        {model: models.Computer, required: false},
        {model: models.Projector, required: false},
        {model: models.WhiteBoard, required: false}]
    }]
  }).then( resource => {
    var mappedResource = {};
    if(resource){
      mappedResource = addPropertiesByType(resource);
    }
    return mappedResource;
  })
}

function addPropertiesByType(resource){
  var res = {};
  res.available = resource.available;
  res.type = resource.resourceType;
  res.is_it = resource.isIt;
  res.id = resource.resourceId;
  switch(resource.resourceType){
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
    default:
      includeObj.push({model: models.Computer, required: false});
      includeObj.push({model: models.Projector, required: false});
      includeObj.push({model: models.WhiteBoard, required: false});
      break;
  }
  return includeObj;
}
