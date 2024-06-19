import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/DisplayPanel.module.css';

const DisplayPanel = ({ setRobotTimes, setDeleteRobot }) => {
  const [nodes, setNodes] = useState([]);
  const [robots, setRobots] = useState([]);
  const [paths, setPaths] = useState([]);
  const [structure, setStructure] = useState([]);
  const [cs, setCs] = useState([]);
  const canvasRef = useRef(null);
  const robotStartTimeRef = useRef({});
  const finishedRobotTimesRef = useRef({});

  const chargeStation = [
    { id: 1, x: 1500, y: 100, color: 'green' },
    { id: 2, x: 1500, y: 130, color: 'green' },
    { id: 3, x: 1500, y: 160, color: 'green' },
    { id: 4, x: 1500, y: 190, color: 'green' },
    { id: 5, x: 1500, y: 220, color: 'green' },
  ];

  // 가로는 100 단위, 세로는 50단위
  const dummyRobots = [
    {
      id: 'AGF0',
      path: [{ x: 200, y: 130 }, { x: 300, y: 130 }, { x: 300, y: 250 }, { x: 500, y: 250 }, { x: 600, y: 250 }, { x: 600, y: 450 }],
      color: 'red',
      currentIndex: 0,
      progress: 0,
      finished: false
    },
    {
      id: 'AGF1',
      path: Array.from({ length: 30 }, () => ({ x: 1500, y: 250 })),
      color: 'blue',
      currentIndex: 0,
      progress: 0,
      finished: false
    },
    {
      id: 'AGF2',
      path: Array.from({ length: 15 }, () => ({ x: 1480, y: 130 })),
      color: 'yellow',
      currentIndex: 0,
      progress: 0,
      finished: false
    },
    {
      id: 'AGF3',
      path: Array.from({ length: 18 }, () => ({ x: 1480, y: 100 })),
      color: 'purple',
      currentIndex: 0,
      progress: 0,
      finished: false
    },

    {
      id: 'AGF4',
      path: [{ x: 630, y: 130 }, { x: 630, y: 230 }, { x: 430, y: 230 }, { x: 430, y: 500 }, { x: 430, y: 700 }, { x: 800, y: 700 }],
      color: 'purple',
      currentIndex: 0,
      progress: 0,
      finished: false
    },

    {
      id: 'AGF5',
      path: [{ x: 970, y: 860 }, { x: 970, y: 600 }, { x: 450, y: 600 }, { x: 450, y: 300 }, { x: 200, y: 300 }, { x: 200, y: 150 }],
      color: 'brown',
      currentIndex: 0,
      progress: 0,
      finished: false
    },

    {
      id: 'AGF6',
      path: [{ x: 200, y: 130 }, { x: 300, y: 130 }, { x: 300, y: 250 }, { x: 500, y: 250 }, { x: 600, y: 250 }, { x: 600, y: 450 }],
      color: 'red',
      currentIndex: 0,
      progress: 0,
      finished: false
    },

    {
      id: 'AGF7',
      path: [{ x: 200, y: 130 }, { x: 300, y: 130 }, { x: 300, y: 250 }, { x: 500, y: 250 }, { x: 600, y: 250 }, { x: 600, y: 450 }],
      color: 'red',
      currentIndex: 0,
      progress: 0,
      finished: false
    },

    {
      id: 'AGF8',
      path: [{ x: 200, y: 130 }, { x: 300, y: 130 }, { x: 300, y: 250 }, { x: 500, y: 250 }, { x: 600, y: 250 }, { x: 600, y: 450 }],
      color: 'red',
      currentIndex: 0,
      progress: 0,
      finished: false
    },

    {
      id: 'AGF9',
      path: [{ x: 200, y: 130 }, { x: 300, y: 130 }, { x: 300, y: 250 }, { x: 500, y: 250 }, { x: 600, y: 250 }, { x: 600, y: 450 }],
      color: 'red',
      currentIndex: 0,
      progress: 0,
      finished: false
    },

    {
      id: 'AGF10',
      path: [{ x: 200, y: 130 }, { x: 300, y: 130 }, { x: 300, y: 250 }, { x: 500, y: 250 }, { x: 600, y: 250 }, { x: 600, y: 450 }],
      color: 'red',
      currentIndex: 0,
      progress: 0,
      finished: false
    },
  ];

  const dummyPaths = [
    [
      
      // path 1
      { x: 200, y: 130 }, { x: 400, y: 130 }, { x: 600, y: 130 }, { x: 800, y: 130 }, { x: 1000, y: 130 }, { x: 1400, y: 130 }, { x: 1400, y: 100 }, { x: 1500, y: 100 },
      // path 2
      { x: 1400, y: 100 }, { x: 1400, y: 130 }, { x: 1500, y: 130 },
      // path 3
      { x: 1400, y: 130 }, { x: 1400, y: 160 }, { x: 1500, y: 160 },
      // path 4
      { x: 1400, y: 160 }, { x: 1400, y: 190 }, { x: 1500, y: 190 },
      // path 5
      { x: 1400, y: 190 }, { x: 1400, y: 220 }, { x: 1500, y: 220 },
      
      // // path 8 (세로)
      // { x: 1200, y: 130 }, { x: 1100, y: 130 }, { x: 1100, y: 950 },
      // { x: 1100, y: 130 }, { x: 1000, y: 130 }, { x: 1000, y: 950 },
      // { x: 1000, y: 130 }, { x: 900, y: 130 }, { x: 900, y: 950 },
      // { x: 900, y: 130 }, { x: 800, y: 130 }, { x: 800, y: 950 },
      // { x: 800, y: 130 }, { x: 700, y: 130 }, { x: 700, y: 950 },
      // { x: 700, y: 130 }, { x: 600, y: 130 }, { x: 600, y: 950 },
      // { x: 600, y: 130 }, { x: 500, y: 130 }, { x: 500, y: 950 },
      // { x: 500, y: 130 }, { x: 400, y: 130 }, { x: 400, y: 950 },
      // { x: 400, y: 130 }, { x: 300, y: 130 }, { x: 300, y: 950 },
      // { x: 300, y: 130 }, { x: 200, y: 130 }, { x: 200, y: 950 },
      // { x: 200, y: 130 }, { x: 100, y: 130 }, { x: 100, y: 950 },

      // // path 9 (가로)
      // { x: 100, y: 850 }, { x: 1500, y: 850 }, { x: 100, y: 850 },
      // { x: 100, y: 750 }, { x: 1500, y: 750 }, { x: 100, y: 750 },
      // { x: 100, y: 650 }, { x: 1500, y: 650 }, { x: 100, y: 650 },
      // { x: 100, y: 550 }, { x: 1500, y: 550 }, { x: 100, y: 550 },
      // { x: 100, y: 450 }, { x: 1500, y: 450 }, { x: 100, y: 450 },
      // { x: 100, y: 350 }, { x: 1500, y: 350 }, { x: 100, y: 350 },
      // { x: 100, y: 250 }, { x: 1500, y: 250 }, { x: 100, y: 250 },
    ],

  ];


  const dummyStructure = [
    [
      // structure 1
      { x: 1000, y: 600 }, { x: 1200, y: 600 }, { x: 1200, y: 700 }, { x: 1000, y: 700 }, { x: 1000, y: 600 },
    ],
    [
      // structure 2
      { x: 200, y: 400 }, { x: 200, y: 600 }, { x: 400, y: 600 }, { x: 400, y: 400 }, { x: 200, y: 400 },
    ],
    [
      // structure 3
      { x: 300, y: 800 }, { x: 600, y: 800 }, { x: 600, y: 830 }, { x: 300, y: 830 }, { x: 300, y: 800 },
    ],
    [
      // structure 4
      { x: 1200, y: 900 }, { x: 1200, y: 600 }, { x: 1300, y: 600 }, { x: 1300, y: 900 }, { x: 1200, y: 900 },
    ],
    [
      // structure 5
      { x: 700, y: 200 }, { x: 760, y: 200 }, { x: 760, y: 220 }, { x: 700, y: 220 }, { x: 700, y: 200 },
    ],

    [
      // structure 6
      { x: 1600, y: 500 }, { x: 1600, y: 650 }, { x: 1450, y: 650 }, { x: 1450, y: 500 }, { x: 1600, y: 500 },
    ],

    [
      // structure 7
      { x: 800, y: 800 }, { x: 840, y: 800 }, { x: 840, y: 1000 }, { x: 800, y: 1000 }, { x: 800, y: 800 },
    ],

    [
      // structure 8
      { x: 900, y: 350 }, { x: 1150, y: 350 }, { x: 1150, y: 380 }, { x: 900, y: 380 }, { x: 900, y: 350 },
    ],

    [
      // structure 9
      { x: 700, y: 200 }, { x: 760, y: 200 }, { x: 760, y: 220 }, { x: 700, y: 220 }, { x: 700, y: 200 },
    ],

    [
      // structure 10
      { x: 700, y: 200 }, { x: 760, y: 200 }, { x: 760, y: 220 }, { x: 700, y: 220 }, { x: 700, y: 200 },
    ],

  ];


  const charge = [
    [
      // structure 1
      { x: 1450, y: 70 }, { x: 1550, y: 70 }, { x: 1550, y: 300 }, { x: 1450, y: 300 }, { x: 1450, y: 70 },
    ],
   
  ];
   
  
  const drawNodes = (ctx, nodeSize = 10) => {
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI);
      ctx.fillStyle = node.color;
      ctx.fill();
    });
  };

  // 로봇 path 그리기
  const drawPaths = (ctx) => {
    paths.forEach(path => {
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.strokeStyle = 'grey';
      ctx.lineWidth = 10;
      ctx.stroke();
    });
  };


  const drawStructure = (ctx) => {
    structure.forEach(path => {
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.strokeStyle = 'darkred';
      ctx.lineWidth = 5;
      ctx.stroke();
    });
  };


  const drawChargeStation = (ctx) => {
    cs.forEach(path => {
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.strokeStyle = 'yellowgreen';
      ctx.lineWidth = 5;
      ctx.stroke();
    });
  };

  useEffect(() => {
    const init = async () => {
      setNodes(chargeStation);
      setRobots(dummyRobots);
      setPaths(dummyPaths);
      setStructure(dummyStructure);
      setCs(charge);
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

      drawPaths(ctx);
      drawNodes(ctx);
      drawStructure(ctx);
      drawChargeStation(ctx);

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
              ctx.lineWidth = 4;
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
              }, 1000); // Here was a large timeout, replaced with a shorter one for testing
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
