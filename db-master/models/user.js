"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userId: {type: DataTypes.INTEGER(), allowNull: false, autoIncrement: true, primaryKey: true},
    firstName : {type: DataTypes.STRING(), allowNull: false, validate: {isAlpha: true}},
    lastName : {type: DataTypes.STRING(), allowNull: false, validate: {isAlpha: true}},
    phoneNumber: {type: DataTypes.STRING(), allowNull: true},
    email: {type: DataTypes.STRING(), allowNull: false, validate: {isEmail: true}},
    isAdmin: {type: DataTypes.BOOLEAN(), defaultValue: false, allowNull: false},
    passwordHash: {type: DataTypes.STRING(64), allowNull: false},
    typeId: {type: DataTypes.INTEGER(), allowNull: true}
  },{
    tableName: 'User',
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.UserType, {foreignKey: 'typeId'});
        User.belongsToMany(models.Resource, {through: models.Reservation, foreignKey: 'userId'});
      }
    }
  });

  return User;
};
