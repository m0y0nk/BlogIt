// File: client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's a token, render the child route.
  // Otherwise, redirect to the login page.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;