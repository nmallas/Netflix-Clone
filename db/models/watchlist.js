'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchList = sequelize.define('WatchList', {}, {});
  WatchList.associate = function(models) {
    // associations can be defined here
  };
  return WatchList;
};
