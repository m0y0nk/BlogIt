// File: server/routes/commentRoutes.js 

const express = require('express');
const router = express.Router();
const {
  createComment,
  getCommentsForPost,
} = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

// POST /api/comments
router.post('/', authMiddleware, createComment);

// GET /api/comments/post/:postId
router.get('/post/:postId', getCommentsForPost);

module.exports = router;