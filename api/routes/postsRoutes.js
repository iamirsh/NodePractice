const { 
    getAllPosts,
    getPostById,
    createPost
  } = require('../controllers/postsController');
  
  const handlePostsRoutes = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
  
    // Handle routes
    if (req.url === '/api/posts' && req.method === 'GET') {
      getAllPosts(req, res);
    } 
    else if (req.url === '/api/posts' && req.method === 'POST') {
      createPost(req, res);
    }
    else if (req.url?.startsWith('/api/posts/') && req.method === 'GET') {
      const postId = parseInt(req.url.split('/')[3]);
      getPostById(req, res, postId);
    }
    else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  };
  
  module.exports = handlePostsRoutes;