'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    photoId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    textfield: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {foreignKey: 'userId'})
    // Comment.belongsTo(models.Photo, {foreignKey: 'photoId'})
  };
  return Comment;
};
