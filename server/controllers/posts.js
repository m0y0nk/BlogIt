const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  const { title, content, tags, status } = req.body;

  try {
    const post = new Post({
      title,
      content,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      status,
      author: req.user.userId,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages[0] });
    }
    res.status(500).json({ message: 'Server error creating post' });
  }
};

// @desc    Get all posts (MODIFIED)
// @route   GET /api/posts
// @access  Public
const getAllPosts = async (req, res) => {
  try {
    const { search, tag } = req.query;

    // Base query: only find 'published' posts
    let query = { status: 'published' };

    // --- Search Logic ---
    if (search) {
      // Create a case-insensitive regex
      const searchRegex = new RegExp(search, 'i');
      
      // Add $or condition to search title, content, and tags
      query.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { tags: searchRegex }, // Search if the tag array contains the regex
      ];
    }

    // --- Tag/Category Filtering Logic ---
    if (tag) {
      // Find posts where the 'tags' array includes the specific tag
      query.tags = { $in: [tag] };
    }

    const posts = await Post.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 });
      
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching posts' });
  }
};

// @desc    Get a single post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'author',
      'username'
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error fetching post' });
  }
};

// --- (Step 2) NEW FUNCTION ---
// @desc    Get all posts by the logged-in user
// @route   GET /api/posts/myposts
// @access  Private
const getMyPosts = async (req, res) => {
  try {
    // Find all posts where the author is the logged-in user
    const posts = await Post.find({ author: req.user.userId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
      
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching user posts' });
  }
};


// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
  // ... (This function remains unchanged)
  const { title, content, tags, status } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: 'User not authorized to update this post' });
    }
    post.title = title || post.title;
    post.content = content || post.content;
    post.status = status || post.status;
    if (tags) {
      post.tags = tags.split(',').map(tag => tag.trim());
    }
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages[0] });
    }
    res.status(500).json({ message: 'Server error updating post' });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
   try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: 'User not authorized to delete this post' });
    }
    await post.remove();
    res.status(200).json({ message: 'Post removed successfully' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error deleting post' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  getMyPosts, 
  updatePost,
  deletePost,
};