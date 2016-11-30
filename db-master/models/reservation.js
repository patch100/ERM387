"use strict";

module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define("Reservation", {
    reservationId: {type: DataTypes.INTEGER(), allowNull: false, autoIncrement: true, primaryKey: true},
    resourceId: {type: DataTypes.INTEGER(), primaryKey: true, allowNull: false},
    userId: {type: DataTypes.INTEGER(), allowNull: true},
    startTime: {type: DataTypes.DATE(), allowNull: false},
    endTime: {type: DataTypes.DATE(), allowNull: false},
    roomId:{type:DataTypes.INTEGER(), allowNull: true}
  },{
    tableName: 'Reservation',
    classMethods: {
      associate: function(models) {
        Reservation.belongsTo(models.Room, {foreignKey: 'roomId', onDelete: "SET NULL", onUpdate: "CASCADE"});
        Reservation.belongsTo(models.Resource, {foreignKey: 'resourceId', onDelete: "CASCADE", onUpdate: "CASCADE"});
        Reservation.belongsTo(models.User, {foreignKey: 'userId', onDelete: "SET NULL", onUpdate: "CASCADE"});
      }
    } 
  });

  return Reservation;
};
