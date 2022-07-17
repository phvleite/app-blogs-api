const sequelize = require('sequelize');
// const BlogPost = require('./blogPost');
// const Category = require('./category');

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

  PostCategory.associate = (db) => {
    db.BlogPost.belongsToMany(db.Category, {
       as: 'Category',
       through: PostCategory,
       foreignKey: 'categoryId',
       otherKey: 'postId',
    });
    db.Category.belongsToMany(db.BlogPost, {
       as: 'BlogPost',
       through: PostCategory,
       foreignKey: 'postId',
       otherKey: 'categoryId',
    });
  }

  return PostCategory;
};

module.exports = PostCategory;
