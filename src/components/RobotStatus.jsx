import React, { useState, useEffect } from 'react';

const RobotStatus = ({ robotTimes }) => {
  const [displayedTimes, setDisplayedTimes] = useState([]);

  // 초기 설정
  useEffect(() => {
    setDisplayedTimes(robotTimes.map(time => ({
      ...time,
      stoppedTime: time.elapsedTime === 0 ? time.elapsedTime : null
    })));
  }, [robotTimes]);

  // 시간이 멈춘 경우 영구적으로 해당 값을 유지
  useEffect(() => {
    setDisplayedTimes(prevTimes => {
      return prevTimes.map(prevTime => {
        const updatedTime = robotTimes.find(rt => rt.id === prevTime.id);
        if (updatedTime) {
          return {
            ...prevTime,
            stoppedTime: prevTime.stoppedTime !== null ? prevTime.stoppedTime : updatedTime.elapsedTime
          };
        }
        return prevTime;
      });
    });
  }, [robotTimes]);

  return (
    <div>
      {displayedTimes.map(time => (
        <div key={time.id}>
          Robot {time.id}: {time.stoppedTime !== null ? `${time.stoppedTime} seconds` : `${time.elapsedTime} seconds`}
        </div>
      ))}
    </div>
  );
};

export default RobotStatus;
