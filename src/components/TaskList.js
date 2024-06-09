// src/components/TaskList.js
import React from 'react';

const TaskList=({tasks,onTaskClick,onDeleteTask}) => {
    return(
        <div className="task-list">
            {tasks.map((task) => (
                <div key={task.id} className="task-item">
                    <h3 onClick={() => onTaskClick(task.id)}>{task.title}</h3>
                    <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                </div>
                    
            ))}
        </div>
    );
};

export default TaskList;