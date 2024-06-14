import React from 'react';
import styles from '../styles/DetailModal.module.css';

function DetailModal({ task, onClose }) {
  return (
    <div className={styles.modal}>
      <div className={styles.detailModalContainer}>
        <div className={styles.head}>
          <p>{task.id}</p>
          <span className={styles.close} onClick={onClose}>&times;</span>
        </div>
        <div className={styles.content}>
          {Object.entries(task).map(([key, value]) => (
            <div key={key}>
              <span className={styles.element}>{`${key} `}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
