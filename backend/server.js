const app = require('./app');
const http = require('http');
const { connectDB } = require('./config/db');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
// Enable CORS to allow frontend to connect
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));