'use strict';
module.exports = (sequelize, DataTypes) => {
  const chats = sequelize.define('chats', {
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  chats.associate = function(models) {
    chats.belongsTo(models.users, {
    	foreignKey: 'user_id'
    });
  };
  return chats;
};