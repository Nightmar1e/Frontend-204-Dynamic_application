const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Define a route that returns the API key
app.get('/api/key', (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});

// Serve the client-side code (HTML, CSS, JavaScript, etc.)
app.use(express.static('public'));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
