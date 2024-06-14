import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/DisplayPanel.module.css';

const DisplayPanel = ({ setRobotTimes }) => {
  const [robots, setRobots] = useState([]);
  const canvasRef = useRef(null);
  const robotStartTimeRef = useRef({});
  const finishedRobotTimesRef = useRef({});

  const dummyRobots = [
    {
      id: 'AGF0',
      path: [{ x: 50, y: 50 }, { x: 100, y: 100 }, { x: 150, y: 50 }, { x: 200, y: 100 }, { x: 250, y: 50 }, { x: 300, y: 100 }],
      color: 'red',
      currentIndex: 0,
      progress: 0,
      finished: false
    },
    {
      id: 'AGF1',
      path: [{ x: 60, y: 60 }, { x: 110, y: 110 }, { x: 160, y: 60 }, { x: 210, y: 110 },
        { x: 260, y: 60 }, { x: 310, y: 110 }, { x: 350, y: 60 }, { x: 330, y: 110 },
        { x: 60, y: 60 }, { x: 110, y: 110 }, { x: 160, y: 60 }, { x: 330, y: 110 },
        { x: 60, y: 60 }, { x: 110, y: 110 }, { x: 160, y: 60 }, { x: 330, y: 110 },
        { x: 60, y: 60 }, { x: 110, y: 110 }, { x: 160, y: 60 }, { x: 330, y: 110 },
        { x: 60, y: 60 }, { x: 110, y: 110 }, { x: 160, y: 60 }, { x: 330, y: 110 }
      ],
      color: 'blue',
      currentIndex: 0,
      progress: 0,
      finished: false
    }
  ];

  useEffect(() => {
    const init = async () => {
      setRobots(dummyRobots);
      dummyRobots.forEach(robot => {
        robotStartTimeRef.current[robot.id] = Date.now();
      });
    };

    init();
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    return () => {};
  }, []);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    const animateRobots = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const drawNodes = () => {
        // Draw nodes if needed
      };

      const drawRobotsAndPaths = () => {
        if (robots) {
          robots.forEach(robot => {
            if (!robot.finished) {
              ctx.beginPath();
              ctx.moveTo(robot.path[0].x, robot.path[0].y);
              robot.path.forEach(point => {
                ctx.lineTo(point.x, point.y);
              });
              ctx.strokeStyle = robot.color;
              ctx.lineWidth = 2;
              ctx.stroke();

              const currentPoint = robot.path[robot.currentIndex];
              const robotWidth = 20;
              const robotHeight = 20;
              const rx = currentPoint.x - robotWidth / 2;
              const ry = currentPoint.y - robotHeight / 2;
              const borderRadius = 5;
              ctx.beginPath();
              ctx.moveTo(rx + borderRadius, ry);
              ctx.lineTo(rx + robotWidth - borderRadius, ry);
              ctx.quadraticCurveTo(rx + robotWidth, ry, rx + robotWidth, ry + borderRadius);
              ctx.lineTo(rx + robotWidth, ry + robotHeight - borderRadius);
              ctx.quadraticCurveTo(rx + robotWidth, ry + robotHeight, rx + robotWidth - borderRadius, ry + robotHeight);
              ctx.lineTo(rx + borderRadius, ry + robotHeight);
              ctx.quadraticCurveTo(rx, ry + robotHeight, rx, ry + robotHeight - borderRadius);
              ctx.lineTo(rx, ry + borderRadius);
              ctx.quadraticCurveTo(rx, ry, rx + borderRadius, ry);
              ctx.closePath();
              ctx.fillStyle = robot.color;
              ctx.fill();
            }
          });
        }
      };

      drawNodes();
      drawRobotsAndPaths();

      const newRobotTimes = robots.map(robot => {
        if (!robot.finished) {
          const currentTime = Date.now();
          const elapsedTime = (currentTime - robotStartTimeRef.current[robot.id]) / 1000;
          return { id: robot.id, elapsedTime: elapsedTime.toFixed(2) };
        } else {
          return { id: robot.id, elapsedTime: finishedRobotTimesRef.current[robot.id] ?? 0 };
        }
      });

      setRobotTimes(newRobotTimes);

      robots.forEach((robot, index) => {
        if (!robot.finished) {
          robot.progress += 0.01;
          if (robot.progress >= 1) {
            robot.currentIndex++;
            robot.progress = 0;
            if (robot.currentIndex >= robot.path.length) {
              robot.finished = true;
              finishedRobotTimesRef.current[robot.id] = newRobotTimes.find(rt => rt.id === robot.id)?.elapsedTime ?? 0;

              setTimeout(() => {
                setRobots(prevRobots => prevRobots.filter((_, idx) => idx !== index));
              }, 10000000);
            }
          }
        }
      });

      requestAnimationFrame(animateRobots);
    };

    animateRobots();
  }, [robots, setRobotTimes]);

  return (
    <canvas ref={canvasRef} className={styles.canvas} />
  );
};

export default DisplayPanel;
