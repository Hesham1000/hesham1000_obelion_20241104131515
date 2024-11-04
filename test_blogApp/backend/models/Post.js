const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Post extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
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
      media: {
        type: DataTypes.STRING, // Assuming media is stored as a URL or path
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('draft', 'published'),
        defaultValue: 'draft',
        allowNull: false,
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

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql',
});

const Post = require('../models/Post');

Post.init(sequelize);

sequelize.sync();

module.exports = sequelize;