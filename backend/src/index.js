const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();

const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');
const bookmarksRouter = require('./routes/bookmarks');
const { protect } = require('./middleware/auth');


const app = express();

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
    ];

    // Add frontend URLs from environment variable
    if (process.env.FRONTEND_URL) {
      process.env.FRONTEND_URL.split(',').forEach(url => {
        allowedOrigins.push(url.trim());
      });
    }

    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
let mongoConnected = false;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  mongoConnected = true;
  console.log('✓ MongoDB connected');
})
.catch(err => {
  mongoConnected = false;
  console.warn('⚠ MongoDB connection failed:', err.message);
  console.warn('⚠ Note: The application will use in-memory data (data will be lost on restart)');
  console.warn('⚠ For persistent data, either:');
  console.warn('  1. Start local MongoDB: mongod --dbpath "C:\\data\\db"');
  console.warn('  2. Use MongoDB Atlas: Update MONGODB_URI in .env with your Atlas connection string');
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', protect, notesRouter);
app.use('/api/bookmarks', protect, bookmarksRouter);


app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
