const rooms = require('./rooms');
const users = require('./users');
const resources = require('./resources');
//DB CALLS HERE
//I WOULD CREATE A SINGLE ENDPOINT FILE FOR THEM TO use
module.exports = {
    getRooms: rooms.getRooms,
    getRoomsByType: rooms.getRoomsByType,
    getRoomById: rooms.getRoomById,
    //getRoomItems: rooms.getRoomItems,
    getRoomTypes: rooms.getRoomTypes,
    getUsers: users.getUsers,
    getUserById: users.getUserById,
    getResourceTypes: resources.getResourceTypes,
    getResourcesByType: resources.getResourcesByType,
    getResources: resources.getResources,
    getResourceById: resources.getResourceById,
    addUser: users.addUser,
    removeUser: users.removeUser,
    addResource: resources.addResource,
    removeResource: resources.removeResource,
    addRoomReservation:rooms.addRoomReservation,
    cancelRoomReservation: rooms.cancelReservation,
    cancelResourceReservation: resources.cancelReservation,
    updateResource: resources.updateResource,
    getReservations: resources.getReservations,
    getReservationById: resources.getReservationById
}
