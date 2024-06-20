import React from 'react';
import Robot from './Robot';
import styles from '../styles/RobotList.module.css';

const RobotList = ({ robots }) => {
  return (
    <div className={styles.robotListContainer}>
      {robots.map((robot, index) => (
        <div key={index} className={styles.robotContainer}>
          <Robot robot={robot} />
        </div>
      ))}
    </div>
  );
};

export default RobotList;
