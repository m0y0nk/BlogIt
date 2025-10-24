// File: client/src/pages/SinglePostPage.jsx 

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext'; // <-- Import useAuth
import './SinglePostPage.css'; // Will add new styles

const SinglePostPage = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // <-- State for comments
  const [newComment, setNewComment] = useState(''); // <-- State for new comment form
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams(); // Get the post 'id' from the URL
  const { user } = useAuth(); // Get current user state

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setLoading(true);
        // Fetch the post
        const postRes = await api.get(`/posts/${id}`);
        setPost(postRes.data);

        // (Step 15b) Fetch the comments for this post
        const commentsRes = await api.get(`/comments/post/${id}`);
        setComments(commentsRes.data);

      } catch (err) {
        console.error('Failed to fetch post or comments:', err);
        setError('Post not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]); // Re-run effect if the 'id' param changes

  // (Step 15c) Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Don't submit empty comments

    try {
      const res = await api.post('/comments', {
        content: newComment,
        postId: id,
      });

      // (UX Flow) Add new comment to state to display immediately
      setComments([...comments, res.data]);
      setNewComment(''); // Clear the textarea
    } catch (err) {
      console.error('Failed to post comment:', err);
      alert('Failed to post comment. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return null;

  return (
    <div className="single-post-container">
      {/* --- POST CONTENT --- */}
      <h1 className="post-title">{post.title}</h1>
      <div className="post-meta">
        Posted by <strong>{post.author.username}</strong> on{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </div>

      {post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="post-content">{post.content}</div>

      {/* --- NEW COMMENT SECTION (with the id="comments") --- */}
      <div className="comments-section" id="comments"> {/* <-- THIS IS THE ID YOU WERE ADDING */}
        <h2>Comments ({comments.length})</h2>
        
        {/* (Step 15c) Comment Form */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              rows="4"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="btn btn-primary">Post Comment</button>
          </form>
        ) : (
          <p className="comment-login-prompt">
            <Link to="/login">Log in</Link> to post a comment.
          </p>
        )}

        {/* (Step 15b) Display Comments */}
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="comment-item">
                <p className="comment-content">{comment.content}</p>
                <p className="comment-meta">
                  <strong>{comment.author.username}</strong>
                  <span> on </span>
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first!</p>
          )}
        </div>
      </div>
      {/* --- END COMMENT SECTION --- */}

      <Link to="/" className="back-link">
        &larr; Back to all posts
      </Link>
    </div>
  );
};

export default SinglePostPage;