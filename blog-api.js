import { createServer } from 'http';

// Mock database
let posts = [
  { id: 1, title: 'First Post', content: 'Hello world!', author: 'Alice' },
  { id: 2, title: 'Second Post', content: 'REST APIs are fun', author: 'Bob' }
];

const server = createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // Handle routes
  if (req.url === '/api/posts' && req.method === 'GET') {
    // Get all posts
    res.end(JSON.stringify(posts));
  } 
  else if (req.url === '/api/posts' && req.method === 'POST') {
    // Create new post
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const newPost = JSON.parse(body);
        newPost.id = posts.length + 1;
        posts.push(newPost);
        res.statusCode = 201;
        res.end(JSON.stringify(newPost));
      } catch {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid data' }));
      }
    });
  }
  else if (req.url?.startsWith('/api/posts/') && req.method === 'GET') {
    // Get single post
    const id = parseInt(req.url.split('/')[3]);
    const post = posts.find(p => p.id === id);
    if (post) {
      res.end(JSON.stringify(post));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Post not found' }));
    }
  }
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Blog API running on http://localhost:${PORT}`);
});