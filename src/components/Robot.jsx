import React, { memo } from 'react';
import styles from '../styles/Robot.module.css'; 
import batteryIcon from '../assets/battery.png';

const Robot = memo(({ robot }) => {

  const progressBarWidth = `${robot.progress * 2.35}px`;
  const progressBarBorderRadius = robot.progress === 100 ? '6px' : '6px 0 0 6px';

  const renderProgress = (includeGoalNode = false) => (
    <>
      <div className={styles.barBack}>
        <div className={styles.progressBar} style={{ width: progressBarWidth, borderRadius: progressBarBorderRadius }}>
          <p>{robot.progress}</p>
        </div>
      </div>
      <div className={styles.task}>
        <p>
          <span className={styles.boldText}>Task</span>
          <span className={styles.valueText}>{robot.taskId}</span>
        </p>
      </div>
      {includeGoalNode && (
        <div className={styles.goalNode}>
          <p>
            <span className={styles.boldText}>Goal Node</span>
            <span className={styles.valueText}>{robot.goalNode}</span>
          </p>
        </div>
      )}
    </>
  );

  return (
    <div className={styles.robotContainer}>
      <div className={styles.robotIdBox}>
        <p className={styles.robotIdText}>{robot.id}</p>
      </div>
      <div className={styles.modeCon}>
        <p className={styles.modeText}>{robot.mode}</p>
      </div>
      <div className={styles.typeText} style={{ top: robot.mode === 'IDLE' ? '25px' : '18px' }}>
        <p>
          <span className={styles.boldText}>Type</span>
          <span className={styles.valueText}>{robot.type}</span>
        </p>
      </div>
      <div>
        <img src={batteryIcon} alt="battery" className={styles.batteryImg} />
        <p className={styles.batteryText}>{robot.battery}</p>
      </div>
      {['TO_TASK', 'PROCESSING', 'CHARGING'].includes(robot.mode) && renderProgress(robot.mode === 'TO_TASK')}
      {robot.mode === 'PAUSE' && (
        <div className={styles.task}>
          <p>
            <span className={styles.boldText}>Task</span>
            <span className={styles.valueText}>{robot.taskId}</span>
          </p>
        </div>
      )}
    </div>
  );
});

export default Robot;