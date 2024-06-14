// TaskList.js

import React from 'react';
import Task from './Task';
import styles from '../styles/TaskList.module.css';

function TaskList({ tasks }) {
  return (
    <div className={styles.taskListContainer}>
      {tasks.map((task, index) => (
        <div key={index} className={styles.taskContainer}>
          <Task task={task} />
        </div>
      ))}
    </div>
  );
}

export default TaskList;
