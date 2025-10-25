// File: client/src/pages/HomePage.jsx 

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import './HomePage.css'; 

// Example tags for the filter dropdown
const exampleTags = ['React', 'Node.js', 'Tech', 'Lifestyle', 'MERN'];

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useSearchParams to read and write to the URL query string
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Local state for the controlled form inputs
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [tagInput, setTagInput] = useState(searchParams.get('tag') || '');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        // Get params from URL
        const search = searchParams.get('search');
        const tag = searchParams.get('tag');

        // Pass params to the API
        const res = await api.get('/posts', {
          params: { search, tag }
        });
        
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchParams]); // Re-run effect when URL params change

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput) {
      newParams.set('search', searchInput);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  // Handle tag filter change
  const handleTagChange = (e) => {
    const newTag = e.target.value;
    setTagInput(newTag);
    
    const newParams = new URLSearchParams(searchParams);
    if (newTag) {
      newParams.set('tag', newTag);
    } else {
      newParams.delete('tag');
    }
    setSearchParams(newParams);
  };

  return (
    <div className="home-page">
      <div className="filter-container">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn search-btn">Search</button>
        </form>
        
        <select value={tagInput} onChange={handleTagChange} className="tag-filter">
          <option value="">All Categories</option>
          {exampleTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <h1>Latest Posts</h1>
      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : posts.length === 0 ? (
        <p>No posts found. Why not create one?</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post._id} className="post-card">
              <h2 className="post-card-title">
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </h2>
              <p className="post-card-meta">
                By {post.author.username} on{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>

              <p className="post-card-excerpt">
                {post.content.substring(0, 100)}...
              </p>
              
              <div className="post-card-links">
                {/* ... (links) ... */}
              </div>

              <div className="post-card-stats">
                <span>👁️ {post.views} Views</span>
                <span>💬 {post.commentCount} Comments</span>
              </div>
              
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;