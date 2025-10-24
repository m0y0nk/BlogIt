// File: client/src/components/Header.jsx 

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-brand">
          <Link to="/">BlogIt</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <>
              {/* --- (Step 6) Add "My Posts" Link --- */}
              <li>
                <Link to="/profile">My Posts</Link>
              </li>
              {/* --- End Modification --- */}
              <li>
                <Link to="/create" className="nav-create-btn">
                  Create Post
                </Link>
              </li>
              <li className="nav-user">
                <span>Hi, {user.username}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;