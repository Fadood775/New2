# Todo API 📝

A simple RESTful Todo API built with Node.js. No external dependencies required - uses only Node's built-in `http` module!

## Features

- ✅ Create, read, update, and delete todos
- 🚀 Lightweight and fast
- 📦 No external dependencies
- 🔄 CORS enabled
- 📋 In-memory storage (simple demo)

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/Fadood775/New2.git
cd New2

# Install dependencies (optional, for development)
npm install
```

### Running the Server

```bash
# Start the server
npm start

# Or run directly
node index.js
```

Server will run on `http://localhost:3000`

## API Endpoints

### Get All Todos
```
GET /todos
```

### Create Todo
```
POST /todos
Content-Type: application/json

{
  "title": "Learn Node.js"
}
```

### Update Todo
```
PUT /todos/:id
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true
}
```

### Delete Todo
```
DELETE /todos/:id
```

## Example Usage

Using curl:

```bash
# Get all todos
curl http://localhost:3000/todos

# Create a todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries"}'

# Update a todo
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a todo
curl -X DELETE http://localhost:3000/todos/1
```

## Development

For auto-reload during development:

```bash
npm install --save-dev nodemon
npm run dev
```

## License

MIT
