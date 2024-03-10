// Import dotenv
require('dotenv').config();

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult, check } = require('express-validator');

// Import models
const User = require('./models/User');
const Book = require('./models/Book');
const Review = require('./models/Review');

// Import routes
const bookRoutes = require('./bookRoutes');

// Create Express app
const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Authentication Middleware
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
}

// Routes
app.post('/api/v1/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
  res.json({ accessToken });
});

app.use('/api', bookRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Import necessary modules
const { body } = require('express-validator');

// Add validation middleware for the login route
app.post('/api/v1/login',
  [
    // Validate username and password
    body('username').notEmpty(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    // Handle validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Continue with login logic
    // ...
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// User registration route
app.post('/api/v1/register', async (req, res) => {
  // Handle user registration logic
  // ...
});
// Logout route
app.post('/api/v1/logout', (req, res) => {
  // Handle user logout logic
  // ...
});
// Route for retrieving a single book
app.get('/api/v1/books/:id', (req, res) => {
  // Handle retrieving a single book logic
  // ...
});

// Route for searching books
app.get('/api/v1/books/search', (req, res) => {
  // Handle searching books logic
  // ...
});
