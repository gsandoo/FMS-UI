import React from 'react';
import TaskModal from './AddTaskModal';
import RobotModal from './AddRobotModal';
import styles from '../styles/AddModal.module.css';

function AddModal({ selectedOption, handleClose }) {
  const ModalComponent = selectedOption === 'Task' ? TaskModal : RobotModal;

  return (
    <div className={styles.modal}>
      <ModalComponent handleClose={handleClose} />
    </div>
  );
}

export default AddModal;
