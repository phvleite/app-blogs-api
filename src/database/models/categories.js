const sequelize = require('sequelize');

const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    tableName: 'Categories',
  });

  return Category;
};

module.exports = Category;
