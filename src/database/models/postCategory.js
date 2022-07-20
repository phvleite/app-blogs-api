const sequelize = require('sequelize');

const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
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
       as: 'categories',
       through: PostCategory,
       foreignKey: 'categoryId',
       otherKey: 'postId',
       onDelete: 'CASCADE',
       onUpdate: 'CASCADE',
     });
    db.Category.belongsToMany(db.BlogPost, {
       as: 'BlogPost',
       through: PostCategory,
       foreignKey: 'postId',
       otherKey: 'categoryId',
       onDelete: 'CASCADE',
       onUpdate: 'CASCADE',
      });
  }

  return PostCategory;
};

module.exports = PostCategory;
