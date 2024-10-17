import React from 'react';
import TaskItem from './TaskItem.jsx';


function TaskList({ title, priority, tasks, completeTask }) {
  return (
    <div className={`task-list ${priority}`}>
      <h2>{title}</h2>
      <ul className="task-items">
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} index={index} completeTask={completeTask} tasks={tasks}/>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

