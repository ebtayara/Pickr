'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    photoId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    albumName: DataTypes.STRING
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
    Album.belongsTo(models.User, {foreignKey: 'userId'})
    Album.belongsTo(models.Photo, {foreignKey: 'photoId'})
  };
  return Album;
};
