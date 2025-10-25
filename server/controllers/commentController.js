// File: server/controllers/commentController.js 

const Comment = require('../models/Comment');
const Post = require('../models/Post');

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Private
const createComment = async (req, res) => {
  const { content, postId } = req.body;
  const author = req.user.userId; // From authMiddleware

  try {
    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    let newComment = new Comment({
      content,
      author,
      post: postId,
    });

    await newComment.save();
    
    // Populate author info before sending back to frontend
    newComment = await newComment.populate('author', 'username');

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating comment' });
  }
};

// @desc    Get all comments for a single post
// @route   GET /api/comments/post/:postId
// @access  Public
const getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username') // Only get username
      // --- MODIFICATION ---
      .sort({ createdAt: 'desc' }); // Change 'asc' to 'desc'
      // --- END MODIFICATION ---

    res.status(200).json(comments);
  } catch (error)
  {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching comments' });
  }
};

module.exports = {
  createComment,
  getCommentsForPost,
};