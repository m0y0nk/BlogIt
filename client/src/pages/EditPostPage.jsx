// File: client/src/pages/EditPostPage.jsx 

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './PostEditor.css'; // Re-use the existing editor CSS

const EditPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('draft');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authorId, setAuthorId] = useState(null); // For security check

  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user

  //  Fetch the post data on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/posts/${id}`);
        const post = res.data;

        // Populate the form fields with existing data
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags.join(', ')); // Convert array back to string
        setStatus(post.status);
        
        // Store author ID for render check
        setAuthorId(post.author._id); 

      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Post not found or you are not authorized.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  //  Handle the update submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const postData = {
      title,
      content,
      tags,
      status,
    };

    try {
      // Use PUT request to update the post
      const res = await api.put(`/posts/${id}`, postData);
      
      // On success, redirect to the updated post's page
      navigate(`/posts/${res.data._id}`);
    } catch (err) {
      console.error('Failed to update post:', err);
      setError(err.response?.data?.message || 'Failed to update post.');
    }
  };

  if (loading) return <div className="loading">Loading editor...</div>;
  
  // (Security Check)
  // If post has loaded AND the current user is not the author, block rendering.
  if (!user || authorId && authorId !== user._id) {
    return (
      <div className="error">
        You are not authorized to edit this post.
      </div>
    );
  }

  // The form is identical to PostEditorPage, but values are pre-filled
  return (
    <div className="editor-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit} className="editor-form">
        {error && <div className="editor-error">{error}</div>}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;