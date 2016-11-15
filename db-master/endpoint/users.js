const models = require('../models/index');

module.exports = {
  getUsers: getUsers,
  getUserById: getUserById,
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
