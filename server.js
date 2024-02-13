// app.js or server.js

const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./bookRoutes'); // Import your book routes

const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the book routes
app.use('/api', bookRoutes); // Use '/api' as the base URL for book-related routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
