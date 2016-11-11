"use strict";

module.exports = function(sequelize, DataTypes) {
  var RoomEquipment = sequelize.define("RoomEquipment", {
    roomId: {type: DataTypes.INTEGER(), allowNull: false, autoIncrement: true, primaryKey: true},
    equipmentId: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
  },{
    tableName: 'RoomEquipment'
   });

  return RoomEquipment;
};
