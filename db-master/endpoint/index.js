const models = require('../models/index');
//DB CALLS HERE
//I WOULD CREATE A SINGLE ENDPOINT FILE FOR THEM TO use
module.exports = {
    getRooms: getRooms,
    getRoomTypes: getRoomTypes,
    getRoomsByType: getRoomsByType,
    getRoomById: getRoomById,
    getUsers: getUsers,
    getUserByTypeAndId: getUserByTypeAndId,
    getResourceTypes: getResourceTypes,
    getResourcesByType: getResourcesByType,
    getResources: getResources,
    getResourceById: getResourceById,
    getRoomItems: getRoomItems
}

function getRooms(){
  return models.Room.findAll({
    include: [{
      model: models.Equipment,
      required: true,
      include: [
        {model: models.Computer, required: false},
        {model: models.Projector, required: false},
        {model: models.WhiteBoard, required: false}]
    }]
  }).then(rooms => {
    var mappedRooms = {};
    if(rooms){
      mappedRooms = rooms.map(room => {
        var items = [];
        for( var i = 0; i < room.Equipment.length; i++ ) {
          var equipment = room.Equipment[i];
          if(equipment.Computer) {
            items.push({type:"Computer", id: equipment.equipmentId, RAM: equipment.Computer.RAM, storage: equipment.Computer.storage, operatingSystem: equipment.Computer.operatingSystem });
          } else if (equipment.Projector) {
            items.push({type: "Projector", id: equipment.equipmentId,});
          } else if (equipment.WhiteBoard) {
            items.push({type: "WhiteBoard", id: equipment.equipmentId, isPrintable: equipment.WhiteBoard.isPrintable});
          }
        }
        return {
          id: room.roomId,
          type: room.roomType,
          room_number: room.roomNumber,
          capacity: room.capacity,
          length: room.length,
          width: room.width,
          height: room.height,
          equipments: items,
        }
      });
      return mappedRooms;
    }
  })
}

function getRoomItems(roomId){
  console.log(roomId);
  return models.Room.findOne({
    where:{
      roomId: roomId
    },
    include: [{
      model: models.Equipment,
      required: true,
      include: [
        {model: models.Computer, required: false},
        {model: models.Projector, required: false},
        {model: models.WhiteBoard, required: false}]
    }]
  }).then(room => {
    console.log(room);
    var mappedRoomItems = {};
    if(room){
      mappedRoomItems.id = room.roomId;
      mappedRoomItems.equipments = [];
      for(var i = 0; i < room.Equipment.length; i++){
        var equipment = room.Equipment[i];
        if(equipment.Computer){
          mappedRoomItems.equipments.push({type:"Computer", id: equipment.equipmentId, RAM: equipment.Computer.RAM, storage: equipment.Computer.storage, operatingSystem: equipment.Computer.operatingSystem });
        }else if(equipment.Projector){
          mappedRoomItems.equipments.push({type: "Projector", id: equipment.equipmentId,});
        }else if(equipment.WhiteBoard){
          mappedRoomItems.equipments.push({type: "WhiteBoard", id: equipment.equipmentId, isPrintable: equipment.WhiteBoard.isPrintable});
        }
      }
    }
    return mappedRoomItems;
  })
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

//type: meeting, conference; id: roomId
function getRoomById(id){
  return models.Resource.findOne({
    where: {
      resourceType: 'Room'
    },
    include: [{
      model: models.Room,
      where: {
        roomId: id
      },
      required: true,
      include: [{
        model: models.Equipment,
        required: true,
        include: [
          {model: models.Computer, required: false},
          {model: models.Projector, required: false},
          {model: models.WhiteBoard, required: false}]
      }]
    }]
  }).then(resource => {
    var mappedRoom = {};
    if(resource){
      var items = [];
      for( var i = 0; i < resource.Room.Equipment.length; i++ ) {
        var equipment = resource.Room.Equipment[i];
        if(equipment.Computer) {
          items.push({type:"Computer", id: equipment.equipmentId, RAM: equipment.Computer.RAM, storage: equipment.Computer.storage, operatingSystem: equipment.Computer.operatingSystem });
        } else if (equipment.Projector) {
          items.push({type: "Projector", id: equipment.equipmentId,});
        } else if (equipment.WhiteBoard) {
          items.push({type: "WhiteBoard", id: equipment.equipmentId, isPrintable: equipment.WhiteBoard.isPrintable});
        }
      }

      mappedRoom = {
        type: resource.Room.roomType,
        id: resource.Room.roomId,
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

//type: meeting, conference
function getRoomsByType(type){
  return models.Resource.findAll({
    where: {
      resourceType: 'Room',
      available: true
    },
    include: [{
      model: models.Room,
      where: {
        roomType: type
      },
      required: true
    }]
  }).then(resources => {
    var mappedRooms = [];
    if(resources){
      mappedRooms = resources.map(resource => {
        return {
          roomType: resource.Room.roomType,
          roomId: resource.Room.roomId,
          resourceId: resource.Room.resourceId,
          height: resource.Room.height,
          width: resource.Room.width,
          length: resource.Room.length,
          capacity: resource.Room.capacity,
          roomNumber: resource.Room.roomNumber,
          availability: resource.available
        }
      });
    }
    return mappedRooms;
  });
}

function getRoomTypes(){
  return models.Room.findAll({attributes: ['roomType'], group:['roomType']}).then(rooms => {
    var mappedRooms = [];
    if(mappedRooms){  // BUG: isnt it supposed to be if rooms?
      mappedRooms = rooms.map(room => room.roomType).sort()
    }
    return mappedRooms;
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