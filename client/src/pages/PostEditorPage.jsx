// File: client/src/pages/PostEditorPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './PostEditor.css'; // Styles for the editor

const PostEditorPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('draft'); // Default to draft
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const postData = {
      title,
      content,
      tags, // Backend expects comma-separated string
      status,
    };

    try {
      // API call is protected. The 'api' instance handles the token.
      const res = await api.post('/posts', postData);

      // On success, redirect to the new post's page
      navigate(`/posts/${res.data._id}`);
    } catch (err) {
      console.error('Failed to create post:', err);
      setError(err.response?.data?.message || 'Failed to create post.');
    }
  };

  return (
    <div className="editor-container">
      <h2>Create New Post</h2>
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
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostEditorPage;