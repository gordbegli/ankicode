'use client';
import { useState, useEffect } from 'react';
import styles from './WelcomeMessage.module.css';

const WelcomeMessage = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowMessage(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  if (!showMessage) return null;

  return (
    <div className={styles.overlay} onClick={() => setShowMessage(false)}>
      <div className={styles.messageContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>Welcome to AnkiCode</h2>
          <button className={styles.closeButton} onClick={() => setShowMessage(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className={styles.content}>
          <p className={styles.subtitle}>
            Memorize algorithms with <a href="https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-Algorithm" target="_blank" rel="noopener noreferrer" className={styles.link}>spaced repetition</a>
          </p>

          <div className={styles.section}>
            <h3>Getting Started</h3>
            <div className={styles.card}>
              <p>Click the logo in the top-right to add your OpenAI API key for AI grading</p>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Keyboard Shortcuts</h3>
            <div className={styles.shortcutGrid}>
              <div className={styles.shortcutItem}>
                <kbd>⌘ Enter</kbd>
                <span>Submit</span>
              </div>
              <div className={styles.shortcutItem}>
                <kbd>⌘ ;</kbd>
                <span>Reveal</span>
              </div>
              <div className={styles.shortcutItem}>
                <kbd>⌘ '</kbd>
                <span>Next</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
