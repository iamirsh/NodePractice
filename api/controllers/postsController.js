// In-memory "database"
let posts = [
    { id: 1, title: 'First Post', content: 'Hello world!', author: 'Alice' },
    { id: 2, title: 'Second Post', content: 'REST APIs are fun', author: 'Bob' }
  ];
  let nextId = 3;
  
  // Controller methods
  const getAllPosts = (req, res) => {
    res.end(JSON.stringify(posts));
  };
  
  const getPostById = (req, res, postId) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      res.end(JSON.stringify(post));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Post not found' }));
    }
  };
  
  const createPost = (req, res) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const newPost = { id: nextId++, ...JSON.parse(body) };
        posts.push(newPost);
        res.statusCode = 201;
        res.end(JSON.stringify(newPost));
      } catch {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid data' }));
      }
    });
  };
  
  module.exports = {
    getAllPosts,
    getPostById,
    createPost
  };