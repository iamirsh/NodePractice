const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
  // Set CORS headers (optional but useful for development)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  // Handle different routes
  if (req.url === '/api/products') {
    const products = [
      { id: 1, name: 'Laptop', price: 999 },
      { id: 2, name: 'Phone', price: 699 }
    ];
    res.end(JSON.stringify(products));
  } 
  else if (req.url === '/api/users') {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];
    res.end(JSON.stringify(users));
  }
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON API server running on http://localhost:${PORT}`);
});