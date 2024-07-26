// routes/authRoutes.js
const express = require('express');
const { register, login, logout} = require('../controllers/authController');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', auth, logout);


module.exports = router;
