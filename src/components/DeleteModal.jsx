import React from 'react';
import axios from 'axios';
import styles from '../styles/DeleteModal.module.css';

function DeleteModal({ taskId, onClose }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://fms.com/api/tasks/${taskId}`);
      onClose();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.deleteModalContainer}>
        <div className={styles.task}>{taskId}</div>
        <p className={styles.content}>Are you sure you want to delete this task?</p>
        <div className={styles.actions}>
          <button className={styles.yes} onClick={handleDelete}>Delete</button>
          <button className={styles.no} onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
