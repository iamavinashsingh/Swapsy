// routes/user.routes.js

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getAllUsers,
} = require('../controllers/user.controller');

const protect = require('../middlewares/auth.middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

router.get('/', protect, getAllUsers); // browse all users

module.exports = router;
