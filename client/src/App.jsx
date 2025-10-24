// File: client/src/App.jsx (MODIFIED)

import React, { useEffect } from 'react'; // <-- Import useEffect
import { Routes, Route, useLocation } from 'react-router-dom'; // <-- Import useLocation
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SinglePostPage from './pages/SinglePostPage';
import PostEditorPage from './pages/PostEditorPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import EditPostPage from './pages/EditPostPage';

function App() {
  const { pathname } = useLocation(); // <-- Get the current URL path

  // --- SCROLL TO TOP LOGIC ---
  // This effect runs every time the 'pathname' changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // --- END ---

  return (
    <div className="App">
      <Header />
      <main className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/posts/:id" element={<SinglePostPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/create" element={<PostEditorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/edit/:id" element={<EditPostPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;