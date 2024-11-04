const express = require('express');
const router = express.Router();
const { getPost, updatePost } = require('../controllers/postController');

// GET /posts/:id - Retrieve a post by ID
router.get('/posts/:id', getPost);

// PUT /posts/:id - Update a post by ID
router.put('/posts/:id', updatePost);

module.exports = router;
