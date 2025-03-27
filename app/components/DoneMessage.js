'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './DoneMessage.module.css';

const DoneMessage = ({ cards }) => {
  const [nextDueTime, setNextDueTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isPulsing, setIsPulsing] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const now = new Date();

    // Retrieve lastNew from localStorage
    let lastNew = localStorage.getItem('lastNew');
    lastNew = lastNew ? new Date(lastNew) : null;

    // Calculate when the next new card is available (at midnight)
    let nextNewTime = null;
    if (!lastNew) {
      // If no lastNew, new cards are available now
      nextNewTime = now;
    } else {
      // Next new card available tomorrow at midnight
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      nextNewTime = tomorrow;
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

  const handleOverlayClick = (e) => {
    // Only trigger the animation if clicking directly on the overlay, not on the messageContainer
    if (e.target === e.currentTarget) {
      setIsPulsing(true);
      // Reset the animation after it completes
      setTimeout(() => setIsPulsing(false), 300);
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div 
        ref={containerRef}
        className={`${styles.messageContainer} ${isPulsing ? styles.pulse : ''}`}>
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
                Checkout the shortcuts listed in our <a className={styles.link} href="https://github.com/gordbegli/ankicode?tab=readme-ov-file#keyboard-shortcuts">readme</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoneMessage;
