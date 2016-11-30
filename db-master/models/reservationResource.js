"use strict";

module.exports = function(sequelize, DataTypes) {
  var ReservationResource = sequelize.define("ReservationResource", {
    reservationId: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
    resourceId: {type: DataTypes.INTEGER(), primaryKey: true, allowNull: false}
  },{
    tableName: 'ReservationResource',
    classMethods: {
      associate: function(models) {
        ReservationResource.belongsTo(models.Reservation, {foreignKey: 'reservationId', onDelete: "CASCADE", onUpdate: "CASCADE"});
        ReservationResource.belongsTo(models.Resource, {foreignKey: 'resourceId', onDelete: "CASCADE", onUpdate: "CASCADE"});
      }
    } 
  });

  return ReservationResource;
};
