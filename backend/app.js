const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Routes
app.get('/', (req, res) => {
    res.send('Swapsy Backend is Live! ');
});
app.use('/users', userRoutes);

module.exports = app;
