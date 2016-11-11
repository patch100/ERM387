"use strict";

module.exports = function(sequelize, DataTypes) {
  var Equipment = sequelize.define("Equipment", {
    equipmentId: {type: DataTypes.INTEGER(), allowNull: false, autoIncrement: true, primaryKey: true},
    resourceId: {type: DataTypes.INTEGER(), allowNull: false, unique:true}
  },{
    tableName: 'Equipment',
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Equipment.belongsTo(models.Resource, {foreignKey: 'resourceId'});
        Equipment.hasOne(models.Computer, {foreignKey: 'equipmentId'});
        Equipment.hasOne(models.Projector, {foreignKey: 'equipmentId'});
        Equipment.hasOne(models.WhiteBoard, {foreignKey: 'equipmentId'});
        Equipment.belongsToMany(models.Room, {through: models.RoomEquipment, foreignKey: 'equipmentId'});
      }
    }
   });

  return Equipment;
};
