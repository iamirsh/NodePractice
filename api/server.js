const http = require('http');
const handlePostsRoutes = require('./routes/postsRoutes');
const logger = require('./middleware/logger'); // Add this line

const server = http.createServer((req, res) => {
  // Apply logger middleware first
  logger(req, res, () => {
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.writeHead(200);
      res.end();
      return;
    }

    // Route to posts handler
    if (req.url.startsWith('/api/posts')) {
      handlePostsRoutes(req, res);
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  });
});

// Ensure logs directory exists
const fs = require('fs');
const path = require('path');
const logsDir = path.join(__dirname, '../logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});