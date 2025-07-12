// controllers/swap.controller.js

const Swap = require('../models/Swap.model');

// @desc    Send a new swap request
// @route   POST /api/swaps
const sendSwapRequest = async (req, res) => {
  const { toUser, skillOffered, skillWanted, message } = req.body;

  if (!toUser || !skillOffered || !skillWanted) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const swap = await Swap.create({
      fromUser: req.user.id,
      toUser,
      skillOffered,
      skillWanted,
      message,
    });

    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send request' });
  }
};

// @desc    Get all swap requests for current user
// @route   GET /api/swaps/mine
const getMySwaps = async (req, res) => {
  try {
    const sent = await Swap.find({ fromUser: req.user.id }).populate('toUser', 'name email');
    const received = await Swap.find({ toUser: req.user.id }).populate('fromUser', 'name email');

    res.json({ sent, received });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch swaps' });
  }
};

// @desc    Accept swap request
// @route   PATCH /api/swaps/:id/accept
const acceptSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: 'Swap not found' });

    if (swap.toUser.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    swap.status = 'accepted';
    await swap.save();

    res.json({ message: 'Swap accepted', swap });
  } catch (err) {
    res.status(500).json({ message: 'Failed to accept swap' });
  }
};

// @desc    Reject swap request
// @route   PATCH /api/swaps/:id/reject
const rejectSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: 'Swap not found' });

    if (swap.toUser.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    swap.status = 'rejected';
    await swap.save();

    res.json({ message: 'Swap rejected', swap });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject swap' });
  }
};

// @desc    Delete a pending swap request (only if you sent it)
// @route   DELETE /api/swaps/:id
const deleteSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: 'Swap not found' });

    if (swap.fromUser.toString() !== req.user.id || swap.status !== 'pending') {
      return res.status(403).json({ message: 'Unauthorized or swap already processed' });
    }

    await swap.deleteOne();
    res.json({ message: 'Swap deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete swap' });
  }
};

module.exports = {
  sendSwapRequest,
  getMySwaps,
  acceptSwap,
  rejectSwap,
  deleteSwap,
};
