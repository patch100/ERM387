const models = require('../models/index');

module.exports = {
  getRooms: getRooms,
  getRoomsByType: getRoomsByType,
  getRoomById: getRoomById,
  getRoomItems: getRoomItems,
  getRoomTypes: getRoomTypes
}

function getRooms(type){
  var typeFilter = type ? {roomType: type} : {};
  return models.Resource.findAll({
    where: {
      resourceType: 'Room'
    },
    include: [{
      model: models.Room,
      required: true,
      where: typeFilter,
      include: [{
        model: models.Equipment,
        required: false,
        include: [
          {model: models.Computer, required: false},
          {model: models.Projector, required: false},
          {model: models.WhiteBoard, required: false}]
      }]
    }]
  }).then(resources => {
    var mappedRooms = {};
    if(resources){
      mappedRooms = resources.map(resource => {
        var items = [];
        var room = resource.Room;
        if(room.Equipment){
          for( var i = 0; i < room.Equipment.length; i++ ) {
            var equipment = room.Equipment[i];
            if(equipment.Computer) {
              items.push({type:"Computer", id: equipment.resourceId, RAM: equipment.Computer.RAM, storage: equipment.Computer.storage, operatingSystem: equipment.Computer.operatingSystem });
            } else if (equipment.Projector) {
              items.push({type: "Projector", id: equipment.resourceId,});
            } else if (equipment.WhiteBoard) {
              items.push({type: "WhiteBoard", id: equipment.resourceId, isPrintable: equipment.WhiteBoard.isPrintable});
            }
          }
        }

        return {
          id: resource.resourceId,
          type: room.roomType,
          room_number: room.roomNumber,
          capacity: room.capacity,
          length: room.length,
          width: room.width,
          height: room.height,
          equipments: items,
          availabile: resource.available
        }
      });
    }
    return mappedRooms;
  });
}

function getRoomItems(id){
  return getRoomById(id).then(room => {
    return {
      id: room.id,
      equipments: room.equipments
    }
  });
}

function getRoomById(id){
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
          items.push({type:"Computer", id: equipment.resourceId, RAM: equipment.Computer.RAM, storage: equipment.Computer.storage, operatingSystem: equipment.Computer.operatingSystem });
        } else if (equipment.Projector) {
          items.push({type: "Projector", id: equipment.resourceId,});
        } else if (equipment.WhiteBoard) {
          items.push({type: "WhiteBoard", id: equipment.resourceId, isPrintable: equipment.WhiteBoard.isPrintable});
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

function getRoomTypes(){
  return models.Room.findAll({attributes: ['roomType'], group:['roomType']}).then(rooms => {
    var mappedRooms = [];
    if(mappedRooms){  // BUG: isnt it supposed to be if rooms?
      mappedRooms = rooms.map(room => room.roomType).sort()
    }
    return mappedRooms;
  })
}

function getRoomsByType(type){
  return getRooms(type);
}
