import React from 'react';
import Task from './Task';
import styles from '../styles/TaskList.module.css';

const TaskList = ({ tasks, activeFilter }) => {
  const filteredTasks = activeFilter
    ? tasks.filter(task => task.status === 'ACTIVE')
    : tasks;

  return (
    <div className={styles.taskList}>
      {filteredTasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
