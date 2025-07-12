// routes/swap.routes.js

const express = require('express');
const router = express.Router();
const {
  sendSwapRequest,
  getMySwaps,
  acceptSwap,
  rejectSwap,
  deleteSwap,
} = require('../controllers/swap.controller');

const protect = require('../middlewares/auth.middleware');

router.post('/', protect, sendSwapRequest);
router.get('/mine', protect, getMySwaps);

router.patch('/:id/accept', protect, acceptSwap);
router.patch('/:id/reject', protect, rejectSwap);
router.delete('/:id', protect, deleteSwap);

module.exports = router;
