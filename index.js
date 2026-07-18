// Simple Todo App Server
const http = require('http');
const fs = require('fs');
const url = require('url');

// In-memory todo list
let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build a project', completed: false }
];

// Create server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Set CORS headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // GET - Retrieve all todos
  if (pathname === '/todos' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(todos));
  }
  
  // POST - Add new todo
  else if (pathname === '/todos' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const newTodo = JSON.parse(body);
      const todo = {
        id: todos.length + 1,
        title: newTodo.title,
        completed: false
      };
      todos.push(todo);
      res.writeHead(201);
      res.end(JSON.stringify(todo));
    });
  }
  
  // PUT - Update todo
  else if (pathname.startsWith('/todos/') && req.method === 'PUT') {
    const id = parseInt(pathname.split('/')[2]);
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const updated = JSON.parse(body);
      const todo = todos.find(t => t.id === id);
      if (todo) {
        todo.title = updated.title || todo.title;
        todo.completed = updated.completed !== undefined ? updated.completed : todo.completed;
        res.writeHead(200);
        res.end(JSON.stringify(todo));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Todo not found' }));
      }
    });
  }
  
  // DELETE - Remove todo
  else if (pathname.startsWith('/todos/') && req.method === 'DELETE') {
    const id = parseInt(pathname.split('/')[2]);
    const index = todos.findIndex(t => t.id === id);
    if (index > -1) {
      const deleted = todos.splice(index, 1);
      res.writeHead(200);
      res.end(JSON.stringify(deleted[0]));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Todo not found' }));
    }
  }
  
  // Default route
  else if (pathname === '/' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ 
      message: 'Welcome to Todo API',
      endpoints: {
        'GET /todos': 'Get all todos',
        'POST /todos': 'Create new todo',
        'PUT /todos/:id': 'Update todo',
        'DELETE /todos/:id': 'Delete todo'
      }
    }));
  }
  
  // 404
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Todo API Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  /todos');
  console.log('  POST /todos');
  console.log('  PUT  /todos/:id');
  console.log('  DELETE /todos/:id');
});
