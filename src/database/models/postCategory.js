const sequelize = require('sequelize');
const BlogPost = require('./blogPost');

const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    tableName: 'PostCategories',
    timestamps: false,
  });

  // PostCategory.associate = (db) => {
  //   PostCategory.belongToMany(db.BlogPost, { as: 'BlogPost', foreignKey: 'postId' });
  //   PostCategory.belongToMany(db.Category, { as: 'Category', foreignKey: 'categoryId' });
  // }

  return PostCategory;
};

module.exports = PostCategory;
