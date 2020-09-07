'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchListContent = sequelize.define('WatchListContent', {
    watchListId: DataTypes.INTEGER,
    poster_path: DataTypes.STRING
  }, {});
  WatchListContent.associate = function(models) {
    WatchListContent.belongsTo(models.WatchList, {
      foreignKey: "watchListId"
    })
  };
  return WatchListContent;
};
