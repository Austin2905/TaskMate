// src/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now() };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const selectTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setSelectedTask(task);
  };

  return (
    <div className="App">
      <h1>TaskMate</h1>
      <TaskList tasks={tasks} onTaskClick={selectTask} onDeleteTask={deleteTask} />
      {selectedTask && !isEditing && (
        <TaskDetail task={selectedTask} onEdit={(id) => { setIsEditing(true); selectTask(id); }} />
      )}
      <TaskForm task={isEditing ? selectedTask : null} onSave={(task) => {
        if (isEditing) {
          editTask(selectedTask.id, task);
          setIsEditing(false);
        } else {
          addTask(task);
        }
      }} />
    </div>
  );
};

export default App;
