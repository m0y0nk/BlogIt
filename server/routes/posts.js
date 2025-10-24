const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPost,
  getMyPosts, 
  updatePost,
  deletePost,
} = require('../controllers/posts');
const authMiddleware = require('../middleware/auth');

// POST /api/posts (Protected)
// GET /api/posts (Public)
router
  .route('/')
  .post(authMiddleware, createPost)
  .get(getAllPosts);

// GET /api/posts/myposts (Protected)
// This MUST come before the /:id route
router.route('/myposts').get(authMiddleware, getMyPosts);

// GET /api/posts/:id (Public)
// PUT /api/posts/:id (Protected + Author check)
// DELETE /api/posts/:id (Protected + Author check)
router
  .route('/:id')
  .get(getPost)
  .put(authMiddleware, updatePost)
  .delete(authMiddleware, deletePost);

module.exports = router;