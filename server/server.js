// File: server/server.js (MODIFIED)

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// --- Import Routes ---
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/commentRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Init Middleware
app.use(cors());
app.use(express.json());

// A simple test route
app.get('/', (req, res) => {
  res.send('API Running...');
});

// --- Use Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// --- Simple Error Handling 
// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 8000; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});