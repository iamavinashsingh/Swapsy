// routes/search.routes.js

const express = require('express');
const router = express.Router();
const { searchUsersBySkill } = require('../controllers/search.controller');

const protect = require('../middlewares/auth.middleware');

router.get('/', protect, searchUsersBySkill);

module.exports = router;
