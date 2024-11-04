const Post = require('../models/Post');
const { Sequelize } = require('sequelize');
const sequelize = require('../database/db');

class PostController {
  static async createPost(req, res) {
    try {
      const { title, content, media, status } = req.body;
      const post = await Post.create({ title, content, media, status });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  }

  static async getPosts(req, res) {
    try {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve posts' });
    }
  }

  static async getPostById(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve post' });
    }
  }

  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, content, media, status } = req.body;
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      await post.update({ title, content, media, status });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update post' });
    }
  }

  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      await post.destroy();
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  }
}

module.exports = PostController;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql',
});

const Post = require('../models/Post');

Post.init(sequelize, {
  modelName: 'Post',
  tableName: 'posts',
  primaryKey: 'id',
});

sequelize.sync();

module.exports = sequelize;