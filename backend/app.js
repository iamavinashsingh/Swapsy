require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRoutes = require('./routes/user.routes');
const swapRoutes = require('./routes/swap.routes');
// const adminRoutes = require('./routes/admin.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const searchRoutes = require('./routes/search.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/swaps', swapRoutes);
// app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/search', searchRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
