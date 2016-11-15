const models = require('../models/index');

module.exports = {
  getUsers: getUsers,
  getUserById: getUserById,
  addUser: addUser,
  removeUser: removeUser
}

function getUsers(){
  return models.User.findAll({include: [{model: models.UserType, required:true}]}).then(users => {
    var mappedUsers = {};
    if(users){
      mappedUsers = users.map(user => {
        return {
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          phone_number: user.phoneNumber,
          is_admin: user.isAdmin,
          type: user.UserType.typeName,
        }
      });
      return mappedUsers;
    }
  });
}

function getUserById(id){
  return models.User.findOne({
    where: {
      userId: id
    },
    include: [{
      model: models.UserType,
      required: true
    }]
  }).then(user => {
    var mappedUser = {};
    if(user){
      mappedUser = {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone_number: user.phoneNumber,
        is_admin: user.isAdmin,
        type: user.UserType.typeName,
      }
    }
    return mappedUser;
  })
}

function addUser(type, user){
  var userObj = {
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phoneNumber: user.phone,
    isAdmin: user.is_admin,
    passwordHash: user.password || ''
  };

  return models.UserType.findOne({
    attributes: ["typeId"],
    where: {
      typeName: type
    }
  }).then((type) => {
    if(type) userObj.typeId = type.typeId;
    return models.User.create(userObj).then(user => { return user != null; });
  });
}

function removeUser(userId){
  return models.User.destroy({
    where: {
      userId: userId
    },
    limit: 1
  }).then((affectedRows) => {
    if(affectedRows === 1) return true;
    return false;
  });
}
