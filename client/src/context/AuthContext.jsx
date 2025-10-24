// File: client/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // On initial load, check if token exists and try to fetch user
    const tokenInStorage = localStorage.getItem('token');
    if (tokenInStorage) {
      setToken(tokenInStorage);
      // You could add a '/api/auth/me' route to verify token and get user
      // For simplicity, we'll assume the token is valid.
      // A more robust app would decode the token or ping an endpoint.
      // For now, let's just parse the user from storage if it exists
      const userInStorage = localStorage.getItem('user');
      if (userInStorage) {
        setUser(JSON.parse(userInStorage));
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;

      setToken(token);
      setUser(user);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err) {
      console.error('Login failed:', err.response.data.message);
      alert('Login Failed: ' + err.response.data.message);
    }
  };

  const signup = async (username, email, password) => {
    try {
      const res = await api.post('/auth/signup', { username, email, password });
      const { token, user } = res.data;

      setToken(token);
      setUser(user);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err) {
      console.error('Signup failed:', err.response.data.message);
      alert('Signup Failed: ' + err.response.data.message);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the context
export const useAuth = () => useContext(AuthContext);