import React, { useState, useEffect } from 'react';
import styles from '../styles/Sidebar.module.css';
import RobotList from './RobotList';
import TaskList from './TaskList';
import AddModal from './AddModal';
import useModal from '../hooks/useModal';

const initialTasks = [
  { id: 'DEL1', type: 'DELIVERY', status: 'ACTIVE', robotId: 'AGF0', Proc: '' },
  { id: 'DEL2', type: 'DELIVERY', status: 'CHARGING', robotId: 'AGF1', Proc: '' },
  { id: 'DEL3', type: 'DELIVERY', status: 'CHARGING', robotId: 'AGF2', Proc: '' },
  { id: 'DEL4', type: 'DELIVERY', status: 'CHARGING', robotId: 'AGF3', Proc: '' },
  { id: 'DEL5', type: 'DELIVERY', status: 'ACTIVE', robotId: 'AGF4', Proc: '' },
  { id: 'DEL6', type: 'DELIVERY', status: 'ACTIVE', robotId: 'AGF5', Proc: '' },
  { id: 'DEL7', type: 'DELIVERY', status: 'ACTIVE', robotId: 'AGF6', Proc: '' },
  { id: 'DEL8', type: 'DELIVERY', status: 'ACTIVE', robotId: 'AGF7', Proc: '' }
];

const initialRobots = [
  { id: 'AGF1', mode: 'TO_TASK', type: 'AGF3', battery: 91, progress: 9, taskId: 'DEL1' },
  { id: 'AGF3', mode: 'TO_TASK', type: 'AGF3', battery: 89, progress: 45, taskId: 'DEL3' },
  { id: 'AGF4', mode: 'TO_TASK', type: 'AGF4', battery: 21, progress: 45, taskId: 'DEL4' },
  { id: 'AGF2', mode: 'TO_TASK', type: 'AGF2', battery: 47, progress: 45, taskId: 'DEL2' },
  { id: 'AGF5', mode: 'TO_TASK', type: 'AGF5', battery: 98, progress: 5, taskId: 'DEL5' },
  { id: 'AGF6', mode: 'TO_TASK', type: 'AGF6', battery: 65, progress: 12, taskId: 'DEL6' },
  { id: 'AGF7', mode: 'TO_TASK', type: 'AGF7', battery: 78, progress: 10, taskId: 'DEL7' }
];

function Sidebar({ robotTimes = [] }) {
  const [selectedOption, setSelectedOption] = useState('Task');
  const [showModal, openModal, closeModal] = useModal();
  const [activeFilter, setActiveFilter] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [robots, setRobots] = useState(initialRobots);

  // Battery 값 증가 처리
  useEffect(() => {
    const batteryInterval = setInterval(() => {
      setRobots(prevRobots => {
        return prevRobots.map(robot => {
          if (robot.id === 'AGF3' || robot.id === 'AGF2' || robot.id === 'AGF4') {
            // AGF3, AGF2, AGF4 로봇은 배터리 증가 및 프로그레스 변경
            const newBattery = robot.battery <= 97 ? robot.battery + 1 : robot.battery;
            return { ...robot, battery: newBattery };
          } else {
            // 그 외 로봇들은 배터리 감소 및 프로그레스 변경
            const newBattery = robot.battery >= 3 ? robot.battery - 1 : 0;
            const newProgress = robot.progress <= 97 ? robot.progress + 2 : 0;
            return { ...robot, battery: newBattery, progress: newProgress };
          }
        });
      });
    }, 3000); // 10초마다 실행
  
    return () => clearInterval(batteryInterval);
  }, []);
  

  // 실시간으로 proc. time 업데이트
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

  // Task 삭제 핸들러
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

 // AddRobotModal에서 새로운 로봇 추가하는 함수
 const addRobot = (newRobot) => {
  setRobots((prevRobots) => [...prevRobots, newRobot]);
};

  // 체크박스 상태 변경 핸들러
  const handleActiveCheckboxChange = (e) => setActiveFilter(e.target.checked);

  // 렌더링할 콘텐츠 선택
  const renderContent = () => {
    switch (selectedOption) {
      case 'Robot':
        return (
          <div className={styles.robotContent}>
            <RobotList robots={robots} />
            <div className={styles.actions}>
              <button className={styles.addButton} onClick={openModal}>Add Robot</button>
            </div>
          </div>
        );
      case 'Task':
      default:
        return (
          <div className={styles.taskContent}>
            <TaskList tasks={tasks} activeFilter={activeFilter} onDeleteTask={handleDeleteTask} />
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
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.tabContainer}>
        <button className={`${styles.taskBar} ${selectedOption === 'Task' ? styles.selected : ''}`} onClick={() => setSelectedOption('Task')}>Task</button>
        <button className={`${styles.robotBar} ${selectedOption === 'Robot' ? styles.selected : ''}`} onClick={() => setSelectedOption('Robot')}>Robot</button>
      </div>

      <div className={styles.container}>
        {renderContent()}
      </div>

      {showModal && <AddModal selectedOption={selectedOption} handleClose={closeModal} addRobot={addRobot} />}
    </aside>
  );
}

export default Sidebar;
