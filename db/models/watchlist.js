'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchList = sequelize.define('WatchList', {}, {});
  WatchList.associate = function(models) {
    WatchList.hasOne(models.Profile, {
      foreignKey: "watchListId"
    })
    WatchList.hasMany(models.WatchListContent, {
      foreignKey: "watchListId"
    })
  };
  return WatchList;
};
