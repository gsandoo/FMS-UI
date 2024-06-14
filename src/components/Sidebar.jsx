import React, { useState, useEffect } from 'react';
import styles from '../styles/Sidebar.module.css';
import RobotList from './RobotList';
import TaskList from './TaskList'; 
import AddModal from './AddModal';
import useModal from '../hooks/useModal';
import RobotStatus from './RobotStatus';

const initialTasks = [
  { id: 'DEL1', type: 'DELIEVERY', status: 'ACTIVE', robotId: 'AGF0', Proc: '' },
  { id: 'DEL2', type: 'DELIEVERY', status: 'ACTIVE', robotId: 'AGF1', Proc: '' }
];

const robots = [
  { id: 'AGF0', mode: 'IDLE', type: 'AGF', battery: 50 },
  { id: 'AGF1', mode: 'TO_TASK', type: 'AGF', battery: 50, progress: 45, taskId: 'DEL2', goalNode: 'R130'}
];

function Sidebar({ robotTimes = [] }) {
  const [selectedOption, setSelectedOption] = useState('Task');
  const [showModal, openModal, closeModal] = useModal();
  const [activeFilter, setActiveFilter] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  


  useEffect(() => {
    if (robotTimes.length > 0) {
      const updatedTasks = tasks.map(task => {
        const robotTime = robotTimes.find(rt => rt.id === task.robotId);
        
        return {
          ...task,
          Proc: robotTime ? `${robotTime.elapsedTime}` : task.Proc
        };
      });
      setTasks(updatedTasks);
    }
  }, [robotTimes]);


  const handleActiveCheckboxChange = (e) => setActiveFilter(e.target.checked);
  const filteredTasks = activeFilter ? tasks.filter(task => task.status === 'ACTIVE') : tasks;

  const renderContent = () => {
    switch (selectedOption) {
      case 'Robot':
        return (
          <div className={styles.robotContent}>
            <RobotList robots={robots}/>
            <div className={styles.actions}> 
              <button className={styles.addButton} onClick={openModal}>Add Robot</button>
            </div>
          </div>
        );
      case 'Task':
      default:
        return (
          <div className={styles.taskContent}>
            <TaskList tasks={filteredTasks} />
            <div className={styles.actions}>
              <label className={styles.checkboxContainer}>
                <input type="checkbox" checked={activeFilter} onChange={handleActiveCheckboxChange} />
                <span className={styles.checkmark}></span>
                ACTIVE
              </label>
              <button className={styles.addButton} onClick={openModal}>Add Task</button>
            </div>
          </div>
        );
    }
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.tabContainer}> 
        <button className={`${styles.taskBar} ${selectedOption === 'Task' ? styles.selected : ''}`} onClick={() => setSelectedOption('Task')}>Task</button>
        <button className={`${styles.robotBar} ${selectedOption === 'Robot' ? styles.selected : ''}`} onClick={() => setSelectedOption('Robot')}>Robot</button>
      </div>
      
      <div className={styles.container}>
        {renderContent()}
      </div>

      {showModal && <AddModal selectedOption={selectedOption} handleClose={closeModal} />}
      
    </aside>
  );
}

export default Sidebar;
