import React, { memo } from 'react';
import styles from '../styles/Task.module.css';
import DetailModal from './DetailModal';
import DeleteModal from './DeleteModal';
import useModal from '../hooks/useModal';

const Task = memo(({ task }) => {
  const [showDetails, openDetails, closeDetails] = useModal();
  const [deleteModal, openDelete, closeDelete] = useModal();

  const renderStatusContent = (statusClassName, statusTextClassName = '') => {
    const procTimeTextClass = task.status === 'ACTIVE'
      ? `${styles.procTimeText} ${styles.activeProcText}`
      : styles.procTimeText;

    return (
      <>
        <div className={procTimeTextClass}>
          <p>
            <span className={styles.boldText}>Proc. Time</span>
            <span className={styles.valueText}>{task.Proc}</span>
          </p>
        </div>
        <div className={styles.statusCon}>
          <button className={`${styles.statusButton} ${statusClassName}`} onClick={openDetails}>
            <p className={`${styles.statusText} ${statusTextClassName}`}>{task.status}</p>
          </button>
        </div>
        {['QUEUED', 'FAILED', 'CANCELED'].includes(task.status) && (
          <div className={styles.deleteCon}>
            <button className={styles.deleteButton} onClick={openDelete}><p className={styles.deleteText}>DELETE</p></button>
          </div>
        )} 
      </>
    );  
  };

  return (
    <div className={styles.taskContainer}>
      <div className={styles.taskIdBox}>
        <p className={styles.taskIdText}>{task.id}</p>
      </div>
      <div className={styles.typeCon}>
        <p className={styles.typeText}>{task.type}</p>
      </div>
      {task.status === 'ACTIVE' && (
        <>
          <div className={styles.robotIdText}>
            <p><span className={styles.boldText}>Robot ID</span><span className={styles.valueText}>{task.robotId}</span></p>
          </div>
          {renderStatusContent(styles.activeStatus)}
        </>
      )}
      {['QUEUED', 'FAILED', 'CANCELED'].includes(task.status) && renderStatusContent(styles.queuedStatus)}
      {['ACTIVE', 'PENDING', 'COMPLETED'].includes(task.status) && renderStatusContent(styles.completeStatus, styles.completeStatusText)}
      
      {showDetails && <DetailModal task={task} onClose={closeDetails} />}
      {deleteModal && <DeleteModal taskId={task.id} onClose={closeDelete} />}
    </div>
  );
});

export default Task;