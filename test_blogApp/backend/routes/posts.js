const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

// Create a new post
router.post('/posts', PostController.createPost);

// Get all posts
router.get('/posts', PostController.getPosts);

// Get a single post by ID
router.get('/posts/:id', PostController.getPostById);

// Update a post by ID
router.put('/posts/:id', PostController.updatePost);

// Delete a post by ID
router.delete('/posts/:id', PostController.deletePost);

module.exports = router;

// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql',
});

const Post = require('../models/Post');

Post.init(sequelize);

sequelize.sync();

module.exports = sequelize;

// Post.js
const { Model, DataTypes } = require('sequelize');

class Post extends Model {}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  media: {
    type: DataTypes.STRING,
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

module.exports = Post;