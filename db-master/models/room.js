"use strict";

module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define("Room", {
    roomType: {type: DataTypes.STRING(), allowNull: false},
    roomId: {type: DataTypes.INTEGER(), allowNull: false, autoIncrement: true, primaryKey: true},
    resourceId: {type: DataTypes.INTEGER(), allowNull: false, unique:true},
    height: {type: DataTypes.DECIMAL(7, 2), allowNull: true},
    width: {type: DataTypes.DECIMAL(7, 2), allowNull: true},
    length: {type: DataTypes.DECIMAL(7, 2), allowNull: true},
    capacity: {type: DataTypes.INTEGER(), allowNull: false},
    roomNumber: {type: DataTypes.STRING(), allowNull: false, unique: true},
  },{
    tableName: 'Room',
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Room.belongsTo(models.Resource, {foreignKey: 'resourceId'});
        }
    }
   });

  return Room;
};
