import React, { useState } from 'react';
import styles from './Progress.module.css';

const Progress = ({ cards, patterns }) => {
  // Group cards by pattern
  const cardsByPattern = patterns.reduce((acc, pattern) => {
    acc[pattern] = [];
    return acc;
  }, {});

  cards.forEach((card) => {
    if (cardsByPattern[card.pattern]) {
      cardsByPattern[card.pattern].push(card);
    }
  });

  // State to track which patterns are open
  const [openPatterns, setOpenPatterns] = useState({});

  // Toggle the accordion for a specific pattern
  const toggleAccordion = (pattern) => {
    setOpenPatterns((prevOpenPatterns) => ({
      ...prevOpenPatterns,
      [pattern]: !prevOpenPatterns[pattern],
    }));
  };

  return (
    <div className={styles.progress}>
      {patterns.map((pattern) => (
        <div key={pattern} className={styles.patternCard}>
          <div className={styles.accordionItem}>
            <div
              className={styles.accordionHeader}
              onClick={() => toggleAccordion(pattern)}
            >
              <div className={styles.headerContent}>
                <p className={styles.pattern}>{pattern}</p>
                <p>{openPatterns[pattern] ? '−' : '+'}</p>
              </div>
            </div>
            {openPatterns[pattern] && (
              <div className={styles.accordionContent}>
                <table className={styles.cardTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Stage</th>
                      <th>Due Date</th>
                      <th>Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cardsByPattern[pattern].map((card) => (
                      <tr key={card.id}>
                        <td>{card.id}</td>
                        <td>{card.stage}</td>
                        <td>{new Date(card.due).toLocaleDateString()}</td>
                        <td>{card.difficultyRating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Progress;