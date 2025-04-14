// 1. Import the HTTP module
const http = require('http');

// 2. Define the server port
const PORT = 3000;

// 3. Create the server
const server = http.createServer((req, res) => {
  // 4. Handle routes
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home Page</h1>');
  } 
  else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>About Us</h1>');
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

// 5. Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});