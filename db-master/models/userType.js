"use strict";

module.exports = function(sequelize, DataTypes) {
  var UserType = sequelize.define("UserType", {
    typeId: {type: DataTypes.INTEGER(), allowNull: false, autoIncrement: true, primaryKey: true},
    typeName: {type: DataTypes.STRING(), allowNull: false}
  },{
    tableName: 'UserType',
    timestamps: false,
    classMethods: {
      associate: function(models) {
        UserType.hasOne(models.User, {
            foreignKey: "typeId",
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        });
      }
    }
    });

  return UserType;
};
