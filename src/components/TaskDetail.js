// src/components/TaskDetail.js
import React from 'react';

const TaskDetail = ({task, onEdit}) => {
    if (!task) return <div>Select a task to view details.</div>;

    return (
        <div className="task-detail">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <button onClick={() => onEdit(task.id)}>Edit</button>
        </div>
    );
};


export default TaskDetail;