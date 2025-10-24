// File: server/config/db.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars (specifically for this file, though server.js also does it)
dotenv.config();

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB cluster
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB Connected...');
  } catch (err) {
    // Log the error and exit the process with failure
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;