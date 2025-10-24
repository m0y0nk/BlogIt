// File: server/routes/auth.js (NEW FILE)

const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth.js');

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/login
router.post('/login', login);

module.exports = router;