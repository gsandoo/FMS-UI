import React, { useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DisplayPanel from "../components/DisplayPanel";
import styles from "../styles/Main.module.css";

export default function Main() {
  const [robotTimes, setRobotTimes] = useState([]);
  const [deleteRobot, setDeleteRobot] = useState([]);
  return (
    <div className={styles.MainContainer}>
      <Header title='FMS'/>
      <div className={styles.content}>
        <div className={styles.Sidebar}>
          <Sidebar robotTimes={robotTimes} />
        </div>
        <div className={styles.DisplayPanel}>
          <DisplayPanel setRobotTimes={setRobotTimes} /> {/* setRobotTimes를 props로 전달 */}
        </div>
      </div>
    </div>
  );
}
