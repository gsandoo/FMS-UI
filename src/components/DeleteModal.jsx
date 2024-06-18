// DeleteModal.jsx

import React from 'react';
import styles from '../styles/DeleteModal.module.css';

function DeleteModal({ taskId, onDeleteTask, onDeleteRobot, onClose }) {
  const handleDelete = async () => {
    try {
      await onDeleteTask(taskId); // onDeleteTask를 호출하여 taskId를 삭제
      onDeleteRobot(taskId); // 해당 taskId를 가진 로봇 삭제
      onClose(); // 삭제 완료 후 모달을 닫습니다.
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.deleteModalContainer}>
        <div className={styles.task}>{taskId}</div>
        <p className={styles.content}>해당 task를 삭제하시겠습니까?</p>
        <div className={styles.actions}>
          <button className={styles.yes} onClick={handleDelete}>Delete</button>
          <button className={styles.no} onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
