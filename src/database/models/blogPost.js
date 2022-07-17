const sequelize = require('sequelize');

const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    tableName: 'BlogPosts',
  });

  // BlogPost.associate = (db) => {
  //   BlogPost.belongsTo(db.User, {
  //     as: 'user',
  //     foreignKey: 'userId'
  //   });
  // }

  return BlogPost;
};

module.exports = BlogPost;
