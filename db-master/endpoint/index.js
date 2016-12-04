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
    updateUser:users.updateUser,
    userLogin:users.userLogin,
    addResource: resources.addResource,
    removeResource: resources.removeResource,
    addRoomReservation:rooms.addRoomReservation,
    addResourceReservation: resources.addResourceReservation,
    cancelRoomReservation: rooms.cancelReservation,
    cancelResourceReservation: resources.cancelReservation,
    updateResource: resources.updateResource,
    getReservations: resources.getReservations,
    getReservationById: resources.getReservationById,
    getUserTypes: users.getUserTypes
}
