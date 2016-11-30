"use strict";

module.exports = function(sequelize, DataTypes) {
  var Resource = sequelize.define("Resource", {
    resourceId: {type: DataTypes.INTEGER(), allowNull: false, autoIncrement: true, primaryKey: true},
    resourceType : {type: DataTypes.STRING(), allowNull: false},
    isIt: {type: DataTypes.BOOLEAN(), allowNull: false, defaultValue: false}
  },{
    tableName: 'Resource',
    classMethods: {
      associate: function(models) {
        Resource.hasOne(models.Room, {foreignKey: "resourceId", onDelete: "CASCADE", onUpdate: "CASCADE"});
        Resource.hasMany(models.Reservation, {foreignKey: 'resourceId', onDelete: "CASCADE", onUpdate: "CASCADE"});
        Resource.hasOne(models.Computer, {foreignKey: 'resourceId', onDelete: "CASCADE", onUpdate: "CASCADE"});
        Resource.hasOne(models.Projector, {foreignKey: 'resourceId', onDelete: "CASCADE", onUpdate: "CASCADE"});
        Resource.hasOne(models.WhiteBoard, {foreignKey: 'resourceId', onDelete: "CASCADE", onUpdate: "CASCADE"});
      }
    }
  });

  return Resource;
};
