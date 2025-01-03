'use client';
import { useState, useEffect } from 'react';
import styles from './DoneMessage.module.css';

const DoneMessage = ({ cards }) => {
  const [nextDueTime, setNextDueTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const now = new Date();

    // Retrieve lastNew from localStorage
    let lastNew = localStorage.getItem('lastNew');
    lastNew = lastNew ? new Date(lastNew) : null;

    // Calculate when the next new card is available (24 hours after lastNew)
    let nextNewTime = null;
    if (!lastNew) {
      // If no lastNew, new cards are available now
      nextNewTime = now;
    } else {
      nextNewTime = new Date(lastNew.getTime() + 24 * 60 * 60 * 1000);
    }

    // Find the next due review card
    const nextDueReview = cards
      .filter(card => card.stage === 'learning')
      .reduce((earliest, card) => {
        const dueDate = new Date(card.due);
        return (!earliest || dueDate < earliest) ? dueDate : earliest;
      }, null);

    // Determine the earliest nextDueTime between nextNewTime and nextDueReview
    let earliestNextDue = null;

    if (nextNewTime && nextNewTime > now) {
      earliestNextDue = nextNewTime;
    }

    if (nextDueReview && nextDueReview > now) {
      if (!earliestNextDue || nextDueReview < earliestNextDue) {
        earliestNextDue = nextDueReview;
      }
    }

    // If neither nextNewTime nor nextDueReview is in the future, set nextDueTime to null
    setNextDueTime(earliestNextDue);
  }, [cards]);

  useEffect(() => {
    if (!nextDueTime) {
      setTimeRemaining('Cards are ready!');
      return;
    }

    const updateTimeRemaining = () => {
      const now = new Date();
      const diff = nextDueTime - now;

      if (diff <= 0) {
        setTimeRemaining('Cards are ready!');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000); // Update every second

    return () => clearInterval(interval);
  }, [nextDueTime]);

  return (
    <div className={styles.overlay}>
      <div className={styles.messageContainer}>
        <h2 className={styles.title}>
          <span className={styles.emoji}>🎉</span> All Done For Now!
        </h2>
        <div className={styles.content}>
          <p className={styles.subtitle}>
            Great job! You've completed all available cards for today.
          </p>

          <div className={styles.section}>
            <h3>
              <span className={styles.emoji}>⏰</span> Next Cards Available In
            </h3>
            <div className={styles.card}>
              {timeRemaining ? (
                <p>
                  Next cards will be ready in:{' '}
                  <span className={styles.timer}>{timeRemaining}</span>
                </p>
              ) : (
                <p>Cards are ready!</p>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <h3>
              <span className={styles.emoji}>💡</span> Quick Tip
            </h3>
            <div className={styles.card}>
              <p>
                Everything has a shortcut. They're all listed in our <a className={styles.link} href="https://github.com/gordbegli/ankicode?tab=readme-ov-file#keyboard-shortcuts">readme</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoneMessage;
