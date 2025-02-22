import React, { useEffect, useRef, useState } from 'react';
import styles from './Progress.module.css';

const Progress = ({ cards, patterns, includeMedium, includeHard }) => {
  const gridRef = useRef(null);
  const [rightEdges, setRightEdges] = useState([]);

  // Group and sort cards by pattern
  const cardsByPattern = patterns.reduce((acc, pattern) => {
    acc[pattern] = cards
      .filter(card => card.pattern === pattern)
      .sort((a, b) => {
        // Learning cards first
        if (a.stage === 'learning' && b.stage !== 'learning') return -1;
        if (b.stage === 'learning' && a.stage !== 'learning') return 1;

        // Then sort by difficulty: Easy -> Medium -> Hard
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return difficultyOrder[a.difficultyRating] - difficultyOrder[b.difficultyRating];
      });
    return acc;
  }, {});

  // Flatten the sorted cards into a single array while maintaining pattern order
  const sortedCards = patterns.flatMap(pattern => cardsByPattern[pattern]);

  useEffect(() => {
    const updatePositions = () => {
      if (!gridRef.current) return;
      
      const grid = gridRef.current;
      const gridRect = grid.getBoundingClientRect();
      const cards = grid.querySelectorAll(`.${styles.cardItem}`);
      const newRightEdges = [];
      
      // Get actual number of columns from grid layout
      const computedStyle = window.getComputedStyle(grid);
      const columns = computedStyle.gridTemplateColumns.split(' ').length;
      
      cards.forEach((card, index) => {
        // Check if card is in rightmost 50% of columns
        const isRightHalf = (index % columns) >= Math.floor(columns / 2);
        newRightEdges.push(isRightHalf);
      });
      
      setRightEdges(newRightEdges);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [cards, styles.cardItem, includeMedium, includeHard]);

  return (
    <div className={styles.progress}>
      <div className={styles.grid} ref={gridRef}>
        {sortedCards
          .filter(card =>  card.difficultyRating === 'Easy' || (card.difficultyRating === 'Medium' && includeMedium) || (card.difficultyRating === 'Hard' && includeHard))
          .map((card, index, array) => {
            const difficultyColor = card.difficultyRating === 'Easy' ? '#90C695' : card.difficultyRating === 'Medium' ? '#E8D5A5' : '#D88B84';
            const formattedDue = card.stage === 'learning' ? new Date(card.due).toLocaleDateString() : 'New';
            
            // Dynamic right-edge detection
            const columns = array.length / 3; // Adjust 3 based on your row count
            const isRightEdge = (index + 1) % columns === columns;
            
            return (
              <div
                key={card.id}
                className={`${styles.cardItem} ${rightEdges[index] ? styles['right-edge'] : ''}`}
                style={{backgroundColor: card.stage === 'learning' ? difficultyColor : 'transparent', border: card.stage === 'learning' ? 'none' : `1px solid ${difficultyColor}`}}
                data-title={`${card.title} (${card.pattern.charAt(0).toUpperCase() + card.pattern.slice(1).toLowerCase()}) (${card.difficultyRating})`}
                data-status={card.stage === 'learning' ? `Due: ${formattedDue}` : 'New'}
                data-difficulty={card.difficultyRating}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Progress;