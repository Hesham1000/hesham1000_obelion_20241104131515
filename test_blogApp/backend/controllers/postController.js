const Post = require('../models/Post');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, datePublished, excerpt } = req.body;
    const newPost = await Post.create({ title, datePublished, excerpt });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, datePublished, excerpt } = req.body;
    const [updatedRows] = await Post.update(
      { title, datePublished, excerpt },
      { where: { id } }
    );
    if (updatedRows) {
      const updatedPost = await Post.findByPk(id);
      res.json(updatedPost);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Post.destroy({ where: { id } });
    if (deletedRows) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
