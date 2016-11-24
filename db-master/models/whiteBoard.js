"use strict";

module.exports = function(sequelize, DataTypes) {
  var WhiteBoard = sequelize.define("WhiteBoard", {
    itemId: {type: DataTypes.INTEGER(), allowNull: false, autoIncrement: true, primaryKey: true},
    resourceId : {type: DataTypes.INTEGER(), allowNull: false, unique: true},
    isPrintable : {type: DataTypes.BOOLEAN(), defaultValue: false, allowNull: false}
  },{
    tableName: 'WhiteBoard',
    classMethods: {
      associate: function(models) {
        WhiteBoard.belongsTo(models.Resource, {foreignKey: 'resourceId'});
      }
    }
  });

  return WhiteBoard;
};
