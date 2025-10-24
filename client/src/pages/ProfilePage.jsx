// File: client/src/pages/ProfilePage.jsx 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css'; 

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Get user info for greeting

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setLoading(true);
        // Call our new protected endpoint
        const res = await api.get('/posts/myposts');
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch user posts:', err);
        setError('Failed to load your posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  if (loading) return <div className="loading">Loading your posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-page">
      <h1>My Posts</h1>
      <p>Manage all your articles, {user?.username}.</p>

      {posts.length === 0 ? (
        <p>You haven't created any posts yet. <Link to="/create">Write one now!</Link></p>
      ) : (
        <div className="profile-posts-list">
          {posts.map((post) => (
            <div key={post._id} className="profile-post-item">
              <div className="post-info">
                <Link to={`/posts/${post._id}`} className="post-title">
                  {post.title}
                </Link>
                {/* Show status badge based on post.status */}
                <span className={`status-badge status-${post.status}`}>
                  {post.status}
                </span>
              </div>
              <div className="post-actions">
                {/*  Link to the new Edit page */}
                <Link to={`/edit/${post._id}`} className="edit-link">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;