import React, { useEffect, useRef, useState } from 'react';
import styles from './Calendar.module.css';

const Calendar = () => {
  const gridRef = useRef(null);
  const [rightEdges, setRightEdges] = useState([]);
  const [daysData, setDaysData] = useState([]);

  useEffect(() => {
    const storedCalendar = JSON.parse(localStorage.getItem('calendar') || '{}');
    const today = new Date();
    const currentYear = today.getUTCFullYear();
    const startDate = new Date(Date.UTC(currentYear, 0, 1));       // Jan 1 this year
    const endDate = new Date(Date.UTC(currentYear, 11, 31));      // Dec 31 this year
    const days = [];
    
    let currentDate = startDate;
    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      days.push({
        date: dateString,
        done: !!storedCalendar[dateString]
      });
      const nextDate = new Date(currentDate);
      nextDate.setUTCDate(nextDate.getUTCDate() + 1);
      currentDate = nextDate;
    }
    
    setDaysData(days);
  }, []);

  // Direct copy from Progress.js edge detection
  useEffect(() => {
    const updatePositions = () => {
      if (!gridRef.current) return;
      
      const grid = gridRef.current;
      const days = grid.querySelectorAll(`.${styles.day}`);
      const newRightEdges = [];
      
      const computedStyle = window.getComputedStyle(grid);
      const columns = computedStyle.gridTemplateColumns.split(' ').length;
      
      days.forEach((_, index) => {
        newRightEdges.push((index % columns) >= Math.floor(columns / 2));
      });
      
      setRightEdges(newRightEdges);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [daysData, styles.day]);

  return (
    <div className={styles.calendar}>
      <div className={styles.grid} ref={gridRef}>
        {daysData.map((day, index) => (
          <div
            key={day.date}
            className={`${styles.day} ${rightEdges[index] ? styles.rightEdge : ''}`}
            data-done={day.done}
            data-title={new Date(day.date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric',
              timeZone: 'UTC' 
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar; 