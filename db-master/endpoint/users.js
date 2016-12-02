const models = require('../models/index');
const crypto = require('crypto');

//algorithm = 'aes-256-ctr',
//password = 'd6F3Efeq';


module.exports = {
  getUsers: getUsers,
  getUserById: getUserById,
  addUser: addUser,
  removeUser: removeUser,
  userLogin:userLogin
}

function getUsers(){
  return models.User.findAll({include: [{model: models.UserType, required:true}]}).then(users => {
    var mappedUsers = {};
    if(users){
      mappedUsers = users.map(user => {
        return {
          userId:user.userId,
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
    passwordHash: crypto.createHash('sha256').update(user.password).digest("hex") || ''
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

function userLogin(username,password){
 return models.User.findOne({
    where: {
      email: username,
    },
    include: [{
      model: models.UserType,
      required: true
    }]
  }).then(user => {
    if(user.passwordHash == crypto.createHash('sha256').update(password).digest("hex")){
      return true;
 /**    
      mappedUser = {
        is_admin: user.isAdmin,
        type: user.UserType.typeName
      }
      return mappedUser;
 */ 
    }
    return false;
  })
}


function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
 
