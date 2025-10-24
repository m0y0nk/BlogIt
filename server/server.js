// File: server/server.js 

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// --- Import Routes ---
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/commentRoutes');

dotenv.config();
connectDB();
const app = express();

// We get the live frontend URL from our environment variables
const clientURL = process.env.CLIENT_URL;

const corsOptions = {
  // Only allow requests from our live Netlify app
  origin: clientURL || "http://localhost:5173", // Fallback for local dev
};

app.use(cors(corsOptions));
// --- END CORS CONFIG ---

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Running...');
});

// --- Use Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// ... (Error Handlers) ...
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

// Render provides its own port via process.env.PORT.
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});