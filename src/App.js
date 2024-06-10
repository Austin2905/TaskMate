import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';
import './App.css';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const editTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/tasks/${id}`, updatedTask);
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const selectTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setSelectedTask(task);
  };

  return (
    <div className="App">
      <h1>Task Management Application</h1>
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
