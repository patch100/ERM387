"use strict";

module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define("Reservation", {
    reservationId: {type: DataTypes.INTEGER(), allowNull: false, autoIncrement: true, primaryKey: true},
    resourceId: {type: DataTypes.INTEGER(), allowNull: false},
    userId: {type: DataTypes.INTEGER(), allowNull: false},
    startTime: {type: DataTypes.DATE(), allowNull: false},
    endTime: {type: DataTypes.DATE(), allowNull: false}
  },{
    tableName: 'Reservation',
    classMethods: {
      associate: function(models) {
        Reservation.belongsTo(models.Resource, {foreignKey: 'resourceId', onDelete: "CASCADE", onUpdate: "CASCADE"});
        Reservation.belongsTo(models.User, {foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE"});
        Reservation.hasMany(models.ReservationResource, {foreignKey: 'reservationId', onDelete: "CASCADE", onUpdate: "CASCADE"});
      }
    } 
  });

  return Reservation;
};
