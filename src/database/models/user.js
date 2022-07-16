const sequelize = require('sequelize');

const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'Users',
  });

  // User.associate = (db) => {
  //   User.hasMany(db.BlogPosts, {
  //     as: 'BlogPosts',
  //     foreignKey: 'userId'
  //   });
  // }

  return User;
};

module.exports = User;
