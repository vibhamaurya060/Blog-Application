// routes/userRoutes.js
const express = require('express');
const { auth } = require('../middleware/authMiddleware');
const { getAllUsers } = require('../controllers/userController');

const router = express.Router();

// GET /api/users - Retrieve all users (Admin only)
router.get('/', auth, getAllUsers);

module.exports = router;
