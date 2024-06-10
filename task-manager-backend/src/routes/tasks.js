const express = require('express');
const router = express.Router();

let tasks = [];
let currentId = 1;

// Get all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// Create a new task
router.post('/', (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title || !description || !dueDate) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newTask = { id: currentId++, title, description, dueDate };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get a single task by ID
router.get('/:id', (req, res) => {
  const task = tasks.find((task) => task.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// Update an existing task
router.put('/:id', (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title || !description || !dueDate) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[taskIndex] = { id: parseInt(req.params.id), title, description, dueDate };
  res.json(tasks[taskIndex]);
});

// Delete a task
router.delete('/:id', (req, res) => {
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).end();
});

module.exports = router;
