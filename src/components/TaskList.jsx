import React from 'react';
import Task from './Task';
import styles from '../styles/TaskList.module.css';

const TaskList = ({ tasks, activeFilter, onDeleteTask }) => {
  const filteredTasks = activeFilter
    ? tasks.filter(task => task.status === 'ACTIVE')
    : tasks;

  return (
    <div className={styles.taskList}>
      {filteredTasks.map(task => (
        <Task key={task.id} task={task} onDelete={onDeleteTask}  />
      ))}
    </div>
  );
};

export default TaskList;
