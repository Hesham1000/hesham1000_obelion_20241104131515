const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Post extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      datePublished: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      excerpt: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    }, {
      sequelize,
      modelName: 'Post',
      tableName: 'posts',
      timestamps: false,
    });
  }
}

module.exports = Post;
