"use strict";

module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define("Reservation", {
    reservationId: {type: DataTypes.INTEGER(), allowNull: false, autoIncrement: true, primaryKey: true},
    resourceId: {type: DataTypes.INTEGER(), allowNull: false},
    userId: {type: DataTypes.INTEGER(), allowNull: false},
    startTime: {type: DataTypes.DATE(), allowNull: false},
    endTime: {type: DataTypes.DATE(), allowNull: false},
    roomId:{type:DataTypes.INTEGER(), allowNull:false}
  },{
    tableName: 'Reservation',
    classMethods: {
      associate: function(models) {
        Reservation.belongsTo(models.Resource, {foreignKey: 'resourceId'});
        Reservation.belongsTo(models.Room, {foreignKey: 'roomId'});
      }
    } 
  });

  return Reservation;
};