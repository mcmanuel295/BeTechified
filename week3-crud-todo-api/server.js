const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build a CRUD API', completed: true },
  { id: 3, title: 'Practice Express.js', completed: false }
];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find((item) => item.id === Number(req.params.id));

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  return res.json(todo);
});

app.post('/api/todos', (req, res) => {
  const { title, completed } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed: Boolean(completed)
  };

  todos.push(newTodo);
  return res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex((item) => item.id === Number(req.params.id));

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const { title, completed } = req.body;

  if (title !== undefined && typeof title !== 'string') {
    return res.status(400).json({ message: 'Title must be a string' });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    title: title !== undefined ? title : todos[todoIndex].title,
    completed: completed !== undefined ? Boolean(completed) : todos[todoIndex].completed
  };

  return res.json(todos[todoIndex]);
});

app.delete('/api/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex((item) => item.id === Number(req.params.id));

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  return res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
});

app.get('/', (req, res) => {
  res.send('CRUD Todo API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
