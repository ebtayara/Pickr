'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    image_url: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
    Photo.belongsTo(models.User, {foreignKey: 'userId'})
    // Photo.belongsTo(models.Album, {foreignKey: 'photoId'})
    // Photo.hasMany(models.Comment, {foreignKey: 'photoId'})
  };
  return Photo;
};
