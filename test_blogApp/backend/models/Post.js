const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

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
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    }, { 
      sequelize, 
      modelName: 'Post',
      timestamps: false,
    });
  }
}

module.exports = Post;
