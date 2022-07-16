const sequelize = require('sequelize');

const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    tableName: 'PostCategories',
  });

  return PostCategory;
};

module.exports = PostCategory;
