"use strict";

module.exports = function(sequelize, DataTypes) {
  var Computer = sequelize.define("Computer", {
    itemId: {type: DataTypes.INTEGER(), allowNull: false, autoIncrement: true, primaryKey: true},
    equipmentId : {type: DataTypes.INTEGER(), allowNull: false, unique: true},
    RAM: {type: DataTypes.DECIMAL(5, 2), allowNull: false, validate:{isNumeric: true}},
    storage: {type: DataTypes.DECIMAL(7, 2), allowNull: false, validate: {isNumeric: true}},
    operatingSystem: {type: DataTypes.STRING(30), allowNull: false}
  },{
    tableName: 'Computer',
    classMethods: {
      associate: function(models) {
        Computer.belongsTo(models.Resource, {foreignKey: 'resourceId'});
      }
    }
  });

  return Computer;
};
