'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    name: DataTypes.STRING,
    imageLink: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    watchListId: DataTypes.INTEGER
  }, {});
  Profile.associate = function(models) {
    Profile.belongsTo(models.User, {
      foreignKey: "userId"
    })
    Profile.belongsTo(models.WatchList, {
      foreignKey: "watchListId"
    })
  };
  return Profile;
};
