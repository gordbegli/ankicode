import React from 'react';
import styles from './Progress.module.css';

const Progress = ({ cards, patterns }) => {
  const progressByPattern = cards.reduce((acc, card) => {
    if (!acc[card.pattern]) {
      acc[card.pattern] = {
        new: 0,
        future: 0,
        due: 0
      };
    }

    const now = new Date();
    const dueDate = new Date(card.due);

    if (card.stage === 'new') {
      acc[card.pattern].new++;
    } 
    else if (card.stage === 'learning') {
      if (dueDate > now) {
        acc[card.pattern].future++;
      } else {
        acc[card.pattern].due++;
      }
    }

    return acc;
  }, {});

  const sortedPatterns = Object.entries(progressByPattern)
    .sort((a, b) => patterns.indexOf(a[0]) - patterns.indexOf(b[0]))
    .map(([pattern, counts]) => {
      const total = counts.new + counts.future+ counts.due;
      const completed = counts.future+ counts.due;
      const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
      return { pattern, counts, total, completed, percentage };
    });

  return (
      <div className={styles.progress}>
        {sortedPatterns.map(({ pattern, counts, total, completed, percentage }) => (
          <div key={pattern} className={styles.patternCard}>
            <p className={styles.pattern}>{pattern}</p>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={{ width: `${percentage}%` }}>
                <div className={styles.tooltip}>New: {counts.new}<br />Due: {counts.due}<br />Future: {counts.future}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default Progress;