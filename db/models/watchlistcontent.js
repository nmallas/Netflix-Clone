'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchListContent = sequelize.define('WatchListContent', {
    watchListId: DataTypes.INTEGER,
    contentId: DataTypes.INTEGER,
    movie: DataTypes.BOOLEAN
  }, {});
  WatchListContent.associate = function(models) {
    // associations can be defined here
  };
  return WatchListContent;
};