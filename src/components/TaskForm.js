// src/components/TaskForm.js
import React, {useState, useEffect} from 'react';

const TaskForm=({task,onSave}) => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const[dueDate, setDueDate] = useState('');
    
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setDueDate(task.dueDate);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({title, description, dueDate});
        setTitle('');
        setDescription('');
        setDueDate('');
    
    };

    return (
        <form onSubmit={handleSubmit} className='task-form'>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
               placeholder='Description'
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               required
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
            <button type='submit'>Save Task</button>
        </form>
    );
};


export default TaskForm;